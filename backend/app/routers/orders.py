from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.order import OrderCreate, OrderResponse
from app.crud import order as order_crud

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(data: OrderCreate, db: AsyncSession = Depends(get_db)):
    return await order_crud.create_order(db, data)

@router.get("", response_model=List[OrderResponse])
async def list_orders(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await order_crud.get_orders(db, skip, limit)

@router.get("/{id}", response_model=OrderResponse)
async def get_order(id: int, db: AsyncSession = Depends(get_db)):
    return await order_crud.get_order(db, id)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_order(id: int, db: AsyncSession = Depends(get_db)):
    await order_crud.delete_order(db, id)
