from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from datetime import timedelta, datetime, timezone
from utils.security import get_password_hash, verify_password
from utils.jwt import create_access_token
from db.database import get_db
from schemas.auth import SignupRequest, LoginRequest, UsersAuth
from models.users import User, UserAuthResponse
from config import settings

router = APIRouter(prefix="/auth", tags=["Auth"])


    
# Deletion of test data (Will delete once api is connected to frontend)
@router.delete("/delete-test-data")
def delete_test_users(db: Session = Depends(get_db)):
    deleted = db.query(User).filter(User.email.like("%@example.com")).delete(synchronize_session=False)
    db.commit()
    return {"deleted_count": deleted}