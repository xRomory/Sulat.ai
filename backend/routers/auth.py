from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.auth import SignupRequest, LoginRequest, AuthResponse
from models.users import User
from services.auth import verify_password, get_password_hash, create_access_token

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
    
    token = create_access_token({"sub": new_user.id})
    
    return AuthResponse(
        access_token=token,
        username=new_user.username,
        email=new_user.email,
    )
    
@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    token = create_access_token({"sub": user.id})
    
    return AuthResponse(
        access_token=token,
        username=user.username,
        email=user.email,
    )