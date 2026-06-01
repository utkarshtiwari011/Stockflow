from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.crud import product as product_crud

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(data: ProductCreate, db: AsyncSession = Depends(get_db)):
    return await product_crud.create_product(db, data)

@router.get("", response_model=List[ProductResponse])
async def list_products(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await product_crud.get_products(db, skip, limit)

@router.get("/{id}", response_model=ProductResponse)
async def get_product(id: int, db: AsyncSession = Depends(get_db)):
    return await product_crud.get_product(db, id)

@router.put("/{id}", response_model=ProductResponse)
async def update_product(id: int, data: ProductUpdate, db: AsyncSession = Depends(get_db)):
    return await product_crud.update_product(db, id, data)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(id: int, db: AsyncSession = Depends(get_db)):
    await product_crud.delete_product(db, id)
