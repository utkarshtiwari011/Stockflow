from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.customer import CustomerCreate, CustomerResponse
from app.crud import customer as customer_crud

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.post("", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
async def create_customer(data: CustomerCreate, db: AsyncSession = Depends(get_db)):
    return await customer_crud.create_customer(db, data)

@router.get("", response_model=List[CustomerResponse])
async def list_customers(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await customer_crud.get_customers(db, skip, limit)

@router.get("/{id}", response_model=CustomerResponse)
async def get_customer(id: int, db: AsyncSession = Depends(get_db)):
    return await customer_crud.get_customer(db, id)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_customer(id: int, db: AsyncSession = Depends(get_db)):
    await customer_crud.delete_customer(db, id)
