from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime

class MessagePresetBase(BaseModel):
    preset_name: str
    message_type: Optional[str] = None
    tone_styles: Optional[List[str]] = []
    occasion: Optional[str] = None
    message_length: Optional[str] = None
    language: Optional[str] = None
    enhancements: Optional[Dict[str, bool]] = {}
    
class MessagePresetCreate(MessagePresetBase):
    pass

class MessagePresetUpdate(MessagePresetBase):
    pass

class MessagePresetOut(MessagePresetBase):
    id: str
    created_at: datetime
    
    class Config:
        orm_mode = True