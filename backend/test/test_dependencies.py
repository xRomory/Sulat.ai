from unittest.mock import MagicMock, patch
import pytest

# @pytest.fixture
# def mock_db():
#     return MagicMock()

@pytest.fixture
def mock_settings():
    with patch("core.dependencies.settings") as mock_setting:
        mock_setting.SECRET_KEY = "test-secret"
        mock_setting.ALGORITHM = "HS256"
        yield mock_setting

def test_dependencies_uses_mock_settings(mock_settings):
    from core.dependencies import get_current_user
    
    result = get_current_user()
    
    assert result == "test-secret"
    assert mock_settings.SECRET_KEY == "test-secret"