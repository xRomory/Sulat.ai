from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.utils import utcnow
import uuid

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    username = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    
    saved_messages = relationship("Message", back_populates="user", cascade="all, delete")
    presets = relationship("MessagePreset", back_populates="user", cascade="all, delete")