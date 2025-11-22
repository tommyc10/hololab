from sqlalchemy import Column, Integer, String, Boolean
from database import Base

# 1. Your Inventory Items (Keep this)
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, default="No description")
    price = Column(Integer)
    is_active = Column(Boolean, default=True)

# 2. Your Users (ADD THIS NEW CLASS)
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)