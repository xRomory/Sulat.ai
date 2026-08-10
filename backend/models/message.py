from sqlalchemy import Column, String, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from utils.prompts import utcnow
from db.database import Base
from uuid import uuid4, UUID

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(PG_UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, default=uuid4)
    content = Column(Text, nullable=False)
    message_type = Column(String)
    tone_styles = Column(JSON)
    occasion = Column(String)
    message_length = Column(String)
    language = Column(String)
    enhancements = Column(JSON)
    
    created_at = Column(DateTime(timezone=True), default=utcnow)
    
    user = relationship("User", back_populates="saved_messages")