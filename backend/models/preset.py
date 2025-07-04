from sqlalchemy import Column, String, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from backend.utils import utcnow
from backend.database import Base
import uuid

class MessagePreset(Base):
    __table__ = "message_presets"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("user.id"), nullable=False)
    
    preset_name = Column(String, nullable=False)
    
    message_type = Column(String)
    tone_styles = Column(JSON)
    occasion = Column(String)
    message_length = Column(String)
    language = Column(String)
    enhancements = Column(JSON)
    
    created_at = Column(DateTime(timezone=True), default=utcnow)
    
    user = relationship("User", back_populates="saved_messages")