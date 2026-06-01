from datetime import datetime
from typing import List
from pydantic import BaseModel, Field, ConfigDict, model_validator

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(..., gt=0)

class OrderCreate(BaseModel):
    customer_id: int
    items: List[OrderItemCreate] = Field(..., min_length=1)

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    unit_price: float
    subtotal: float
    product_name: str

    model_config = ConfigDict(from_attributes=True)

    @model_validator(mode="before")
    @classmethod
    def get_product_name(cls, data):
        if not isinstance(data, dict) and hasattr(data, "product") and data.product:
            data.product_name = data.product.name
        return data

class OrderResponse(BaseModel):
    id: int
    customer_id: int
    customer_name: str
    status: str
    total_amount: float
    created_at: datetime
    items: List[OrderItemResponse]

    model_config = ConfigDict(from_attributes=True)

    @model_validator(mode="before")
    @classmethod
    def get_customer_name(cls, data):
        if not isinstance(data, dict) and hasattr(data, "customer") and data.customer:
            data.customer_name = data.customer.full_name
        return data
