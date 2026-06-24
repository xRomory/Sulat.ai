from db.users_db import UserDatabase

class UserService:
    def __init__(self, user_db: UserDatabase) -> None:
        self.db = user_db