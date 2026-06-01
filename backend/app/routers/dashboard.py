from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app.database import get_db
from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats")
async def get_dashboard_stats(db: AsyncSession = Depends(get_db)):
    # 1. Total products count
    prod_count_res = await db.execute(select(func.count(Product.id)))
    total_products = prod_count_res.scalar() or 0

    # 2. Total customers count
    cust_count_res = await db.execute(select(func.count(Customer.id)))
    total_customers = cust_count_res.scalar() or 0

    # 3. Total orders count
    order_count_res = await db.execute(select(func.count(Order.id)))
    total_orders = order_count_res.scalar() or 0

    # 4. Total revenue (sum of Order.total_amount for active, non-cancelled orders)
    rev_res = await db.execute(
        select(func.sum(Order.total_amount)).filter(Order.status != "cancelled")
    )
    total_revenue = float(rev_res.scalar() or 0.0)

    # 5. Low stock products (quantity <= 5)
    low_stock_res = await db.execute(
        select(Product).filter(Product.quantity <= 5).order_by(Product.quantity.asc()).limit(10)
    )
    low_stock_products = [
        {
            "id": p.id,
            "name": p.name,
            "sku": p.sku,
            "price": float(p.price),
            "description": p.description,
            "quantity": p.quantity
        }
        for p in low_stock_res.scalars().all()
    ]

    # 6. Recent orders (last 5 orders, with preloaded customer relations)
    from sqlalchemy.orm import selectinload
    recent_orders_res = await db.execute(
        select(Order).options(selectinload(Order.customer)).order_by(Order.id.desc()).limit(5)
    )
    recent_orders = []
    for o in recent_orders_res.scalars().all():
        recent_orders.append({
            "id": o.id,
            "customer_name": o.customer.full_name if o.customer else "Unknown Customer",
            "total_amount": float(o.total_amount),
            "status": o.status,
            "created_at": o.created_at
        })

    return {
        "total_products": total_products,
        "total_customers": total_customers,
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "low_stock_products": low_stock_products,
        "recent_orders": recent_orders
    }
