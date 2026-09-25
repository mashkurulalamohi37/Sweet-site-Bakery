from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.config import settings
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.delivery import DeliveryZone
from app.models.coupon import Coupon
from app.models.inventory import InventoryItem, InventoryTransaction
from app.schemas.order import OrderCreate, OrderResponse
from typing import List
import uuid
import datetime

router = APIRouter(prefix="/orders", tags=["Orders & Checkout"])

@router.post("", response_model=OrderResponse)
async def create_order(req: OrderCreate, db: AsyncSession = Depends(get_db)):
    if not req.items:
        raise HTTPException(status_code=400, detail="Cart is empty. Please add cakes to place an order.")
    
    # 1. Fetch products from DB and calculate accurate subtotal
    subtotal = 0
    order_items_to_create = []
    
    for item in req.items:
        prod_res = await db.execute(select(Product).where(Product.id == item.product_id))
        prod = prod_res.scalars().first()
        if not prod:
            raise HTTPException(status_code=400, detail=f"Product {item.product_id} not found or unavailable")
            
        unit_price = prod.sale_price if prod.sale_price else prod.base_price
        line_total = unit_price * item.quantity
        subtotal += line_total
        
        order_items_to_create.append(
            OrderItem(
                product_id=prod.id,
                product_name=prod.name,
                product_sku=prod.sku,
                product_image=prod.image_url,
                unit_size=prod.unit,
                unit_price=unit_price,
                quantity=item.quantity,
                line_total=line_total,
                cake_message=item.cake_message,
                customization_details=item.customization_details
            )
        )
        
    # 2. Strict Backend Minimum Order Rule (৳499)
    min_order = settings.MIN_ORDER_AMOUNT
    if subtotal < min_order:
        raise HTTPException(
            status_code=400, 
            detail=f"Minimum order threshold is ৳{min_order:,}. Your subtotal is ৳{subtotal:,}. Please add more items to proceed."
        )
        
    # 3. Delivery Fee Calculation
    delivery_fee = 60 # Default Rangpur City
    zone_res = await db.execute(select(DeliveryZone).where(DeliveryZone.name == req.delivery_area))
    zone = zone_res.scalars().first()
    if zone:
        delivery_fee = 0 if subtotal >= zone.free_delivery_threshold else zone.delivery_fee
        
    # 4. Coupon Discount Check
    discount_amount = 0
    if req.coupon_code:
        coup_res = await db.execute(select(Coupon).where(Coupon.code == req.coupon_code.upper(), Coupon.is_active == True))
        coup = coup_res.scalars().first()
        if coup and subtotal >= coup.min_order_amount:
            if coup.discount_type == "PERCENT":
                calc_disc = int(subtotal * (coup.discount_value / 100))
                discount_amount = min(calc_disc, coup.max_discount) if coup.max_discount else calc_disc
            else:
                discount_amount = coup.discount_value
            coup.times_used += 1
            
    grand_total = max(0, subtotal + delivery_fee - discount_amount)
    
    # 5. Create Order
    today_str = datetime.datetime.now().strftime("%y%m%d")
    short_uuid = uuid.uuid4().hex[:4].upper()
    order_number = f"SSB-{today_str}-{short_uuid}"
    
    order = Order(
        order_number=order_number,
        customer_name=req.customer_name,
        customer_phone=req.customer_phone,
        customer_email=req.customer_email,
        delivery_area=req.delivery_area,
        delivery_address=req.delivery_address,
        delivery_landmark=req.delivery_landmark,
        delivery_date=req.delivery_date,
        delivery_time_slot=req.delivery_time_slot,
        subtotal=subtotal,
        delivery_fee=delivery_fee,
        discount_amount=discount_amount,
        grand_total=grand_total,
        coupon_code=req.coupon_code,
        payment_method=req.payment_method,
        payment_status="PENDING",
        status="PENDING",
        customer_notes=req.customer_notes
    )
    
    db.add(order)
    await db.flush()
    
    # Attach items
    for oi in order_items_to_create:
        oi.order_id = order.id
        db.add(oi)
        
    # 6. Reserve Inventory
    # Reserve basic packaging boxes
    box_res = await db.execute(select(InventoryItem).where(InventoryItem.sku == "INV-BOX"))
    box_item = box_res.scalars().first()
    if box_item:
        box_item.quantity_reserved += len(req.items)
        db.add(InventoryTransaction(
            item_id=box_item.id,
            order_id=order.id,
            change_amount=len(req.items),
            transaction_type="ORDER_RESERVATION",
            reason=f"Stock reserved for Order #{order_number}"
        ))
        
    await db.commit()
    
    # Reload with items
    loaded_order = await db.execute(select(Order).where(Order.id == order.id))
    return loaded_order.scalars().first()

@router.get("/track/{order_number}", response_model=OrderResponse)
async def track_order(order_number: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Order).where(Order.order_number == order_number.strip().upper()))
    order = res.scalars().first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found. Please check your order number.")
    return order
