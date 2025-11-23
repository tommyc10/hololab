from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware 
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel # Needed for our new simple schemas
from datetime import datetime
from typing import List
from fastapi import Body

import models, schemas, database
from hashing import Hash
import token_auth
from database import engine, SessionLocal  

# Create DB Tables
models.Base.metadata.create_all(bind=database.engine)

# --- PHASE 5 DATA STRUCTURES (Simple Mode) ---
# We define these here to keep things simple and fast.
# Later, we can move these to schemas.py and database tables.

class BountySchema(BaseModel):
    id: int
    name: str
    region: str
    reward: int
    status: str
    type: str

class TransactionSchema(BaseModel):
    id: int
    description: str
    amount: int
    date: str
    category: str

class Planet(BaseModel):
    id: int
    name: str
    sector: str
    coords: List[int] # [x, y] percentages for the map
    risk: str         # "Low", "Medium", "High", "Critical"
    activity: str     # e.g. "Imperial Blockade", "Rebel Cell"






# --- MOCK DATA ---
bounties_db = [
    # Syndicate (Contracts)
    {"id": 1, "name": "Governor Pryce", "region": "Lothal", "reward": 50000, "status": "Active", "type": "Syndicate"},
    {"id": 2, "name": "Vizago", "region": "Outer Rim", "reward": 12000, "status": "Completed", "type": "Syndicate"},
    {"id": 3, "name": "Han Solo", "region": "Vermillion", "reward": 10000000, "status": "Auction", "type": "Syndicate"},
    {"id": 4, "name": "Boba Fett", "region": "Nar Shaddaa", "reward": 500000, "status": "High Priority", "type": "Syndicate"},

    # Empire (Targets)
    {"id": 3, "name": "Spectre-1", "region": "Unknown", "reward": 100000, "status": "Active", "type": "Empire"},
    {"id": 4, "name": "Saw Gerrera", "region": "Jedha", "reward": 250000, "status": "Active", "type": "Empire"},
]

finance_db = [
    # Empire (Treasury)
    {"id": 1, "description": "Sector 7 Tax Collection", "amount": 1500000, "date": "2025-10-01", "category": "Revenue"},
    {"id": 2, "description": "TIE Defender Research", "amount": -450000, "date": "2025-10-02", "category": "R&D"},
    # Syndicate (Laundering)
    {"id": 3, "description": "Spice Shipment (Kessel)", "amount": 300000, "date": "3 ABY-04-14", "category": "Smuggling"},
    {"id": 4, "description": "Port Authority Bribe", "amount": -15000, "date": "3 ABY-04-14", "category": "Overhead"},
    {"id": 5, "description": "Jabba's Entry Fee", "amount": 100000, "date": "3 ABY-04-15", "category": "Auction"},
    {"id": 4, "description": "Security Droids (Vermillion)", "amount": -45000, "date": "3 ABY-04-14", "category": "Defense"},
]


galaxy_db = [
    {"id": 1, "name": "Coruscant", "sector": "Core", "coords": [50, 50], "risk": "Critical", "activity": "Imperial Center"},
    {"id": 2, "name": "Tatooine", "sector": "Outer Rim", "coords": [80, 80], "risk": "Medium", "activity": "Hutt Dispute"},
    {"id": 3, "name": "Lothal", "sector": "Outer Rim", "coords": [75, 20], "risk": "Low", "activity": "Factory Shutdown"},
    {"id": 4, "name": "Jekara", "sector": "Unknown", "coords": [20, 30], "risk": "Critical", "activity": "Crimson Dawn Auction"},
    {"id": 5, "name": "Kessel", "sector": "Outer Rim", "coords": [85, 40], "risk": "High", "activity": "Spice Lane Patrols"},
    {"id": 6, "name": "Corellia", "sector": "Core", "coords": [55, 60], "risk": "High", "activity": "Shipyard Inspection"},
]

# --- DATABASE SEEDING ---
def create_initial_user():
    db = SessionLocal()
    try:
        existing_user = db.query(models.User).filter(models.User.username == "crimson_dawn").first()
        if not existing_user:
            print("⚡ CREATING CRIMSON DAWN ADMIN ACCOUNT...")
            syndicate_admin = models.User(
                username="crimson_dawn",
                hashed_password=Hash.bcrypt("syndicate")
            )
            db.add(syndicate_admin)
            db.commit()
            print("✅ SYSTEM READY: Login with 'crimson_dawn' / 'syndicate'")
        else:
            print("ℹ️ SYSTEM READY: Crimson Dawn admin already active.")
    except Exception as e:
        print(f"⚠ SEEDING ERROR: {e}")
    finally:
        db.close()

create_initial_user()

# --- APP CONFIG ---
app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to Hololab API"}

# --- AUTH & USERS ---

@app.post('/user', response_model=schemas.UserShow)
def create_user(request: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = models.User(
        username=request.username, 
        hashed_password=Hash.bcrypt(request.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")
    if not Hash.verify(user.hashed_password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect Password")

    access_token = token_auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# --- INVENTORY (SQL DATABASE) ---

@app.get("/items/", response_model=list[schemas.Item])
def get_items(db: Session = Depends(get_db)):
    items = db.query(models.Item).all()
    return items

@app.post("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemBase, db: Session = Depends(get_db)):
    db_item = models.Item(name=item.name, description=item.description, price=item.price)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"message": "item deleted"}

# --- PHASE 5: ELIMINATIONS & FINANCE (MOCK DATA) ---

@app.get("/bounties", response_model=List[BountySchema])
def get_bounties():
    # In the future, replace this with: db.query(models.Bounty).all()
    return bounties_db

@app.get("/finance", response_model=List[TransactionSchema])
def get_finance():
    # In the future, replace this with: db.query(models.Transaction).all()
    return finance_db


# --- NEW ENDPOINT: UPDATE BOUNTY STATUS ---
@app.put("/bounties/{bounty_id}")
def update_bounty_status(bounty_id: int, status: str = Body(..., embed=True)):
    # Find the bounty in our list
    for bounty in bounties_db:
        if bounty["id"] == bounty_id:
            bounty["status"] = status
            return bounty
            
    raise HTTPException(status_code=404, detail="Bounty not found")



# 3. ADD ENDPOINT
@app.get("/heat", response_model=List[Planet])
def get_heat_map():
    return galaxy_db