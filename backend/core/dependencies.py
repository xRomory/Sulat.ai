from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from ..models.users import User
from ..db.database import get_db
from ..config import settings
from ..config import JWT_SECRET_KEY

security = HTTPBearer()

ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials
    
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=ALGORITHM)
        user_id: str | None = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user