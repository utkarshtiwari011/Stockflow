from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate

async def get_products(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Product]:
    result = await db.execute(select(Product).offset(skip).limit(limit).order_by(Product.id.desc()))
    return list(result.scalars().all())

async def get_product(db: AsyncSession, product_id: int) -> Product:
    result = await db.execute(select(Product).filter(Product.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {product_id} not found"
        )
    return product

async def get_product_by_sku(db: AsyncSession, sku: str) -> Optional[Product]:
    result = await db.execute(select(Product).filter(Product.sku == sku))
    return result.scalar_one_or_none()

async def create_product(db: AsyncSession, data: ProductCreate) -> Product:
    # Check SKU uniqueness
    existing_product = await get_product_by_sku(db, data.sku)
    if existing_product:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="SKU already exists"
        )
    
    product = Product(
        name=data.name,
        sku=data.sku,
        description=data.description,
        price=data.price,
        quantity=data.quantity
    )
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return product

async def update_product(db: AsyncSession, product_id: int, data: ProductUpdate) -> Product:
    product = await get_product(db, product_id)
    
    # If SKU is being updated, check uniqueness
    if data.sku is not None and data.sku != product.sku:
        existing_product = await get_product_by_sku(db, data.sku)
        if existing_product:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="SKU already exists"
            )
            
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)
        
    await db.commit()
    await db.refresh(product)
    return product

async def delete_product(db: AsyncSession, product_id: int) -> None:
    product = await get_product(db, product_id)
    await db.delete(product)
    await db.commit()
