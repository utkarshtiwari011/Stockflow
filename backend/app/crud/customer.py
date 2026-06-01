from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from app.models.customer import Customer
from app.schemas.customer import CustomerCreate

async def get_customers(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Customer]:
    result = await db.execute(select(Customer).offset(skip).limit(limit).order_by(Customer.id.desc()))
    return list(result.scalars().all())

async def get_customer(db: AsyncSession, customer_id: int) -> Customer:
    result = await db.execute(select(Customer).filter(Customer.id == customer_id))
    customer = result.scalar_one_or_none()
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Customer with ID {customer_id} not found"
        )
    return customer

async def get_customer_by_email(db: AsyncSession, email: str) -> Optional[Customer]:
    result = await db.execute(select(Customer).filter(Customer.email == email))
    return result.scalar_one_or_none()

async def create_customer(db: AsyncSession, data: CustomerCreate) -> Customer:
    # Check email uniqueness
    existing_customer = await get_customer_by_email(db, data.email)
    if existing_customer:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    customer = Customer(
        full_name=data.full_name,
        email=data.email,
        phone=data.phone
    )
    db.add(customer)
    await db.commit()
    await db.refresh(customer)
    return customer

async def delete_customer(db: AsyncSession, customer_id: int) -> None:
    customer = await get_customer(db, customer_id)
    await db.delete(customer)
    await db.commit()
