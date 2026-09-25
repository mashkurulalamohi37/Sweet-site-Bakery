from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid
from app.core.database import Base

class CustomizationOption(Base):
    __tablename__ = "customization_options"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    category = Column(String(50), nullable=False) # OCCASION, FLAVOR, SIZE, FROSTING, DESIGN, COLOR, EXTRA
    name = Column(String(150), nullable=False)
    description = Column(String(255), nullable=True)
    extra_price = Column(Integer, default=0) # Additional charge in BDT
    color_hex = Column(String(50), nullable=True)
    sort_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

class CustomizationRequest(Base):
    __tablename__ = "customization_requests"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    request_number = Column(String(50), unique=True, index=True, nullable=False)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    
    customer_name = Column(String(255), nullable=False)
    customer_phone = Column(String(50), nullable=False)
    customer_email = Column(String(255), nullable=True)
    
    occasion = Column(String(100), nullable=True)
    flavor_name = Column(String(100), nullable=True)
    size = Column(String(50), default="1.5 pound")
    frosting = Column(String(100), nullable=True)
    design_style = Column(String(100), nullable=True)
    color_theme = Column(JSON, default=list) # List of colors
    extras = Column(JSON, default=list)      # List of selected extras
    cake_message = Column(String(100), nullable=True)
    
    reference_image_url = Column(String(500), nullable=True)
    special_instructions = Column(Text, nullable=True)
    preferred_date = Column(String(50), nullable=True)
    preferred_time = Column(String(50), default="Any time")
    budget_estimate = Column(Integer, nullable=True)
    
    calculated_base_price = Column(Integer, default=0)
    proposed_final_price = Column(Integer, nullable=True)
    
    status = Column(String(50), default="PENDING") # PENDING, UNDER_REVIEW, PROPOSED, APPROVED, REJECTED, CONVERTED_TO_ORDER
    admin_notes = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    user = relationship("User", back_populates="customization_requests")
