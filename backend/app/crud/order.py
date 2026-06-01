from decimal import Decimal
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.customer import Customer
from app.schemas.order import OrderCreate

from sqlalchemy.orm import selectinload

async def get_orders(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Order]:
    result = await db.execute(
        select(Order)
        .options(
            selectinload(Order.customer),
            selectinload(Order.items).selectinload(OrderItem.product)
        )
        .offset(skip)
        .limit(limit)
        .order_by(Order.id.desc())
    )
    return list(result.scalars().all())

async def get_order(db: AsyncSession, order_id: int) -> Order:
    result = await db.execute(
        select(Order)
        .options(
            selectinload(Order.customer),
            selectinload(Order.items).selectinload(OrderItem.product)
        )
        .filter(Order.id == order_id)
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with ID {order_id} not found"
        )
    return order

async def create_order(db: AsyncSession, data: OrderCreate) -> Order:
    # STEP 1: Verify customer exists
    customer_result = await db.execute(select(Customer).filter(Customer.id == data.customer_id))
    customer = customer_result.scalar_one_or_none()
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Customer with ID {data.customer_id} not found"
        )

    # Validate items list is not empty
    if not data.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order must contain at least one item"
        )

    # To keep track of products and prevent duplicate item lines logic checking
    product_ids = [item.product_id for item in data.items]
    if len(product_ids) != len(set(product_ids)):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order contains duplicate items for the same product"
        )

    order_items_to_create = []
    total_amount = Decimal("0.00")

    # STEP 2: Verify products exist and have sufficient stock
    for item in data.items:
        prod_result = await db.execute(select(Product).filter(Product.id == item.product_id))
        product = prod_result.scalar_one_or_none()
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with ID {item.product_id} not found"
            )

        if product.quantity < item.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Insufficient stock for product: {product.name} (available: {product.quantity})"
            )

        # STEP 3: Deduct product quantity atomically
        product.quantity -= item.quantity

        # STEP 4: Calculate subtotal and store snapshots
        unit_price = Decimal(str(product.price))
        subtotal = Decimal(item.quantity) * unit_price
        total_amount += subtotal

        order_item = OrderItem(
            product_id=product.id,
            product=product,
            quantity=item.quantity,
            unit_price=unit_price,
            subtotal=subtotal
        )
        order_items_to_create.append(order_item)

    # STEP 5: Create main Order entity
    order = Order(
        customer_id=customer.id,
        customer=customer,
        status="confirmed",  # Mark as confirmed directly upon successful creation
        total_amount=total_amount
    )
    db.add(order)
    await db.flush()  # Populates order.id

    # STEP 6: Save OrderItems
    for order_item in order_items_to_create:
        order_item.order_id = order.id
        db.add(order_item)

    # STEP 7: Commit atomic transaction
    await db.commit()

    # STEP 8: Eagerly select the created order with all relations asynchronously
    stmt = (
        select(Order)
        .options(
            selectinload(Order.customer),
            selectinload(Order.items).selectinload(OrderItem.product)
        )
        .filter(Order.id == order.id)
    )
    res = await db.execute(stmt)
    return res.scalar_one()

async def delete_order(db: AsyncSession, order_id: int) -> None:
    order = await get_order(db, order_id)

    # STEP 8: Restore product quantities if the order was not already cancelled
    if order.status != "cancelled":
        for item in order.items:
            prod_result = await db.execute(select(Product).filter(Product.id == item.product_id))
            product = prod_result.scalar_one_or_none()
            if product:
                product.quantity += item.quantity

    # STEP 9: Remove order (cascades automatically to items)
    await db.delete(order)
    await db.commit()
