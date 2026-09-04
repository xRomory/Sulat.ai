from datetime import datetime, timedelta, timezone
from typing import Optional, Any
from fastapi import HTTPException, status
from jose import JWTError, jwt
from config import settings
from models.users import User

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(user: User, expires_delta: Optional[timedelta] = None) -> str:
    if settings.jwt_secret_key is None:
        raise ValueError("JWT_SECRET_KEY must be set")
    
    expire: datetime = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    
    payload: dict[str, str | int] = {
        "sub": str(user.username),
        "id": str(user.id),
        "exp": int(expire.timestamp())
    }
    
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=ALGORITHM)

def decode_access_token(token: str) -> dict[str, Any]:
    if settings.jwt_secret_key is None:
        raise ValueError("JWT_SECRET_KEY must be set")
    
    try:
        return jwt.decode(token, settings.jwt_secret_key, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )