from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from models.preset import MessagePreset
from models.users import User
from schemas.preset import MessagePresetCreate, MessagePresetOut, MessagePresetUpdate
from database import get_db
from dependencies import get_current_user

router = APIRouter(prefix="/presets", tags=["Presets"])

@router.get("/", response_model=List[MessagePresetOut])
def list_presets(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(MessagePreset).filter_by(user_id=user.id).all()

@router.post("/", response_model=MessagePresetOut)
def create_preset(preset: MessagePresetCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    new_preset = MessagePreset(**preset.model_dump(), user_id=user.id)
    
    db.add(new_preset)
    db.commit()
    db.refresh(new_preset)
    
    return new_preset

@router.get("/{preset_id}", response_model=MessagePresetOut)
def get_preset(preset_id: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    preset = db.query(MessagePreset).filter_by(id=preset_id, user_id=user.id).first()
    
    if not preset:
        raise HTTPException(status_code=404, detail="Preset not found")
    
    return preset

@router.put("/{preset_id}", response_model=MessagePresetOut)
def update_preset(preset_id: str, update: MessagePresetUpdate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    preset = db.query(MessagePreset).filter_by(id=preset_id, user_id=user.id).first()
    if not preset:
        raise HTTPException(status_code=404, detail="Preset not found.")
    
    for field, value in update.model_dump(exclude_unset=True).items():
        setattr(preset, field, value)
        
    
    db.commit()
    db.refresh(preset)
    
    return preset

@router.delete("/{preset_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_preset(preset_id: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    preset = db.query(MessagePreset).filter_by(id=preset_id, user_id=user.id).first()
    
    if not preset:
        raise HTTPException(status_code=404, detail="Preset not found")
    
    db.delete(preset)
    db.commit()