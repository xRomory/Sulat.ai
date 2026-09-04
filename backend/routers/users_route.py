from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from db.database import get_db
from services.users_service import UserService
from schemas.users import UserCreate, UserAuthResponse, UserResponse
from backend.schemas.users import LoginRequest

router = APIRouter(prefix="/users", tags=["Users"])

def get_user_service(db: Session = Depends(get_db)) -> UserService:
    return UserService(db)

@router.post(
    "/signup",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def signup(
    user_data: UserCreate,
    service: UserService = Depends(get_user_service)
) -> UserResponse:
    try:
        return service.signup(user_data)
        # return UserResponse(
        #     id=new_user.id,
        #     username=new_user.username,
        #     email=new_user.email
        # )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post(
    "/login",
    response_model=UserAuthResponse
)
def login(
    credentials: LoginRequest,
    service: UserService = Depends(get_user_service)
) -> UserAuthResponse:
    try:
        return service.login(credentials)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))