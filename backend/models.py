from database import Base
from sqlalchemy import Column, Integer, String

# --- AUTHENTICATION TABLE ---
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)


# --- INVENTORY TABLE 
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Integer)


# --- PHASE 5: NEW TABLES (Future Proofing) ---

class Bounty(Base):
    __tablename__ = "bounties"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    region = Column(String)
    reward = Column(Integer)
    status = Column(String) # "Active", "Completed"
    type = Column(String)   # "Empire", "Syndicate"

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    amount = Column(Integer)
    date = Column(String)
    category = Column(String)