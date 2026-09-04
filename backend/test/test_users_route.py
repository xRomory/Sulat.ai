import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock
from main import app
from routers.users_route import get_user_service
from services.users_service import UserService
from schemas.users import UserAuthResponse
from models.users import User
from uuid import uuid4

@pytest.fixture
def mock_user_service():
    return MagicMock(spec=UserService)

@pytest.fixture
def mock_client(mock_user_service):
    app.dependency_overrides[get_user_service] = lambda: mock_user_service
    yield TestClient(app)
    app.dependency_overrides.clear()

@pytest.fixture
def fake_user() -> User:
    return User(
        id=uuid4(),
        username="Test User",
        email="test.user@email.com",
        password="hashedpassword"
    )
    
@pytest.fixture
def fake_login_user(fake_user) -> UserAuthResponse:
    return UserAuthResponse(
        access_token="fake-jwt-token",
        token_type="bearer",
        user_id=fake_user.id,
        username=fake_user.username,
        email=fake_user.email
    )

def test_signup_success(
    mock_user_service,
    mock_client,
    fake_user
):
    mock_user_service.signup.return_value = fake_user
    
    response = mock_client.post(
        "/users/signup",
        json={
            "username": "Test User",
            "email": "test.user@email.com",
            "password": "test123"
        }
    )
    
    assert response.status_code == 201
    
    data = response.json()
    
    assert data["id"] == str(fake_user.id)
    assert data["username"] == "Test User"
    assert data["email"] == "test.user@email.com"
    
    mock_user_service.signup.assert_called_once()

def test_signup_email_already_exists(
    mock_user_service,
    mock_client
):
    mock_user_service.signup.side_effect = ValueError("Email Already exists")
    
    response = mock_client.post(
        "/users/signup",
        json={
            "username": "Test User",
            "email": "test.user@email.com",
            "password": "test123"
        }
    )
    
    assert response.status_code == 409
    assert response.json()["detail"] == "Email Already exists"
    
    mock_user_service.signup.assert_called_once()

def test_signup_runtime_error(
    mock_user_service,
    mock_client
):
    mock_user_service.signup.side_effect = RuntimeError(
        "Database connection failed"
    )
    
    response = mock_client.post(
        "/users/signup",
        json={
            "username": "Test User",
            "email": "test.user@email.com",
            "password": "test123"
        }
    )
    
    assert response.status_code == 500
    assert response.json()["detail"] == "Database connection failed"

def test_signup_invalid_request(
    mock_client
):
    no_username_response = mock_client.post(
        "/users/signup",
        json={
            "email": "test.user@email.com",
            "password": "test123"
        }
    )
    
    invalid_email_response = mock_client.post(
        "/users/signup",
        json={
            "username": "Test User",
            "email": "testemail.com",
            "password": "test123"
        }
    )
    
    assert no_username_response.status_code == 422
    assert invalid_email_response.status_code == 422

def test_login_success(
    mock_client,
    mock_user_service,
    fake_login_user,
    fake_user
):
    mock_user_service.login.return_value = fake_login_user
    
    response = mock_client.post(
        "/users/login",
        json={
            "email": "test.user@email.com",
            "password": "test123"
        }
    )
    
    assert response.status_code == 200