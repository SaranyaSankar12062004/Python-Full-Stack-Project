from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Order, OrderItem, Product
from app.schemas.schemas import OrderCreate, OrderOut
from app.auth import decode_token
from typing import List

router = APIRouter(prefix="/api/orders", tags=["orders"])

def get_current_user(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    user_id = decode_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    return int(user_id)

@router.post("/", response_model=OrderOut)
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    total = 0.0
    new_order = Order(user_id=user_id, total=0, status="pending")
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for item in order.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        total += product.price * item.quantity
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=product.price
        )
        db.add(order_item)

    new_order.total = total
    db.commit()
    db.refresh(new_order)
    return new_order

@router.get("/my", response_model=List[OrderOut])
def get_my_orders(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    return db.query(Order).filter(Order.user_id == user_id).all()