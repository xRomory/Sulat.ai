import pytest
from unittest.mock import patch, MagicMock

def test_get_db_yields_session_and_closes():
    mock_session = MagicMock()
    mock_session_local = MagicMock(return_value=mock_session)
    
    with patch("db.database.SessionLocal", mock_session_local):
        from db.database import get_db
        
        generate = get_db()
        db = next(generate)
        
        assert db is mock_session
        
        with pytest.raises(StopIteration):
            next(generate)
        
        mock_session.close.assert_called_once()

def test_get_db_closes_session_on_exception():
    mock_session = MagicMock()
    mock_session_local = MagicMock(return_value=mock_session)
    
    with patch("db.database.SessionLocal", mock_session_local):
        from db.database import get_db
    
        generate = get_db()
        next(generate)
    
        with pytest.raises(Exception):
            generate.throw(Exception("Something went wrong"))
        
        mock_session.close.assert_called_once()