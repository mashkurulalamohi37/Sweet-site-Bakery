from sqlalchemy import Column, String, Integer, Boolean, DateTime
from datetime import datetime, timezone
import uuid
from app.core.database import Base

class DeliveryZone(Base):
    __tablename__ = "delivery_zones"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), unique=True, nullable=False) # "Rangpur City", "Outside Rangpur"
    description = Column(String(255), nullable=True)
    delivery_fee = Column(Integer, default=60) # in BDT
    free_delivery_threshold = Column(Integer, default=2500) # Orders over 2500 get free delivery
    estimated_delivery_time = Column(String(100), default="Same Day / Scheduled")
    is_active = Column(Boolean, default=True)

class DeliverySlot(Base):
    __tablename__ = "delivery_slots"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(50), nullable=False) # "Morning (10 AM - 1 PM)", "Afternoon (1 PM - 5 PM)", "Evening (5 PM - 9 PM)"
    sort_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
