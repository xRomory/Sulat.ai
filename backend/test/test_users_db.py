import pytest
from uuid import uuid4, UUID
from sqlalchemy.exc import IntegrityError
from unittest.mock import MagicMock
from db.users_db import UserDatabase, UserNotFoundException
from models.users import User

@pytest.fixture
def mock_session():
    return MagicMock()

def test_init_stores_stores(mock_session: MagicMock):
    user_db = UserDatabase(mock_session)
    assert user_db.db is mock_session

def test_create_user(mock_session: MagicMock):
    repo = UserDatabase(mock_session)
    
    user = create_user()
    result = repo.create(user)
    
    assert result.username == user.username
    assert result.email == user.email
    assert result.hashed_password == user.hashed_password
    
    mock_session.add.assert_called_once()
    
    created_user = mock_session.add.call_args.args[0]
    
    assert created_user.username == user.username
    assert created_user.email == user.email
    assert created_user.hashed_password == user.hashed_password
    
    mock_session.commit.assert_called_once()
    mock_session.refresh.assert_called_once_with(created_user)

def test_duplicate_user(mock_session: MagicMock):
    repo = UserDatabase(mock_session)
    user = create_user()
    
    mock_session.commit.side_effect = IntegrityError(
        "duplicate user",
        None,
        Exception("UNIQUE constraints failed"),
    )
    
    with pytest.raises(ValueError, match="User already exists"):
        repo.create(user)
    
    mock_session.add.assert_called_once()
    mock_session.rollback.assert_called_once()
    mock_session.refresh.assert_not_called()

def test_get_by_email_success(mock_session: MagicMock):
    user = create_user()
    mock_session.query.return_value.filter.return_value.first.return_value = user
    repo = UserDatabase(mock_session)
    
    result = repo.get_by_email(user.email)
    
    assert result is user
    assert result.email == user.email
    
    mock_session.query.assert_called_once_with(User)

def test_get_by_email_not_found(mock_session: MagicMock):
    mock_session.query.return_value.filter.return_value.first.return_value = None
    repo = UserDatabase(mock_session)
    with pytest.raises(UserNotFoundException):
        repo.get_by_email("usernotfound@example.com")

def test_get_by_user_id_success(mock_session: MagicMock):
    repo = UserDatabase(mock_session)
    user = create_user()
    mock_session.query.return_value.filter.return_value.first.return_value = user
    result = repo.get_by_user_id(user.id)
    
    assert user.id == result.id

def test_get_by_user_id_not_found(mock_session: MagicMock):
    mock_session.query.return_value.filter.return_value.first.return_value = None
    repo = UserDatabase(mock_session)
    with pytest.raises(UserNotFoundException):
        repo.get_by_user_id(uuid4())

def test_list_all_users(mock_session: MagicMock):
    repo = UserDatabase(mock_session)
    
    user1 = create_user(username="User 1")
    user2 = create_user(username="User 2")
    print(user2)
    mock_session.query.return_value.all.return_value = [user1, user2]
    
    list_users = repo.list_all()
    all_users = {u.username for u in list_users}
    
    assert len(list_users) == 2
    assert "User 1" in all_users
    assert "User 2" in all_users

def test_delete_user_success(mock_session: MagicMock):
    repo = UserDatabase(mock_session)
    user = create_user()
    
    assert repo.delete(user.id) is True
    mock_session.query.return_value.filter.return_value.first.return_value = None
    with pytest.raises(UserNotFoundException):
        repo.get_by_user_id(user.id)

def create_user(
    id = uuid4(),
    username: str = "Test User",
    email: str = "testuser@example.com",
    hashed_password: str = "password123"
) -> User:
    
    return User(
        id=id,
        username=username,
        email=email,
        hashed_password=hashed_password
    )