from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.auth import SignupRequest, LoginRequest, AuthResponse
from models.users import User
from services.auth import verify_password, get_password_hash, create_access_token
from config import settings
from utils import utcnow

router = APIRouter(prefix="/auth", tags=["Auth"])
    
@router.post("/signup")
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
    
    hashed_pw = get_password_hash(data.password)
    new_user = User(username=data.username, email=data.email, hashed_password=hashed_pw)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = create_access_token({
        "sub": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
    })
    
    return AuthResponse(
        access_token=token,
        username=new_user.username,
        email=new_user.email,
        user_id=new_user.id,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        created_at=utcnow(),
    )
    
@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    token = create_access_token({
        "sub": user.id,
        "username": user.username,
        "email": user.email,
    })
    
    return AuthResponse(
        access_token=token,
        username=user.username,
        email=user.email,
        user_id=str(user.id),
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        created_at=utcnow(),
    )
    
# Deletion of test data (Will deleted once api is connected to frontend)
@router.delete("/delete-test-data")
def delete_test_users(db: Session = Depends(get_db)):
    deleted = db.query(User).filter(User.email.like("%@example.com")).delete(synchronize_session=False)
    db.commit()
    return {"deleted_count": deleted}