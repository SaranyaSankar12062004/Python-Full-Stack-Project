from pydantic import BaseModel
from typing import Optional, List

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    stock: int
    image_url: Optional[str] = ""
    category: str

class ProductOut(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stock: int
    image_url: str
    category: str
    class Config:
        from_attributes = True

class OrderItemIn(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemIn]

class OrderOut(BaseModel):
    id: int
    total: float
    status: str
    class Config:
        from_attributes = True