from database import Base
from sqlalchemy import Column, Integer, String

# --- AUTHENTICATION ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

# --- INVENTORY ---
class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Integer)

# --- ELIMINATIONS (BOUNTIES) ---
class Bounty(Base):
    __tablename__ = "bounties"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    region = Column(String)
    reward = Column(Integer)
    status = Column(String) # "Active", "High Priority", "Auction", "Completed"
    type = Column(String)   # "Empire" or "Syndicate"

# --- FINANCE (TRIBUTE FLOWS) ---
class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    amount = Column(Integer)
    date = Column(String)
    category = Column(String)

# --- OPERATIVES (SPY NETWORK) ---
class Operative(Base):
    __tablename__ = "operatives"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    location = Column(String)
    role = Column(String)
    status = Column(String)
    cover = Column(String)
    image = Column(String)

# --- HEAT MAP (GALAXY) ---
class Planet(Base):
    __tablename__ = "planets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    sector = Column(String)
    # Storing coords as separate Integers for SQL
    coord_x = Column(Integer) 
    coord_y = Column(Integer)
    risk = Column(String)     # "Low", "Medium", "Critical"
    activity = Column(String)