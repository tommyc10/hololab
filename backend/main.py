from fastapi import FastAPI, Depends, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware 
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Optional

import models, schemas, database
from hashing import Hash
import token_auth
from database import engine, SessionLocal  
from models import Bounty, Transaction, Operative, Planet, User, Item

# 1. CREATE DATABASE TABLES
models.Base.metadata.create_all(bind=database.engine)

# 2. DEFINE APP & MIDDLEWARE (Must be at the top)
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

# 3. DATABASE DEPENDENCY
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 4. PYDANTIC SCHEMAS (Data Validation Models)
# We define these here so the API knows what JSON format to send back
class BountySchema(BaseModel):
    id: int
    name: str
    region: str
    reward: int
    status: str
    type: str
    class Config:
        from_attributes = True

class BountyCreate(BaseModel):
    name: str
    region: str
    reward: int
    type: str

class TransactionSchema(BaseModel):
    id: int
    description: str
    amount: int
    date: str
    category: str
    class Config:
        from_attributes = True

class OperativeSchema(BaseModel):
    id: int
    name: str
    location: str
    role: str
    status: str
    cover: str
    image: Optional[str] = None
    class Config:
        from_attributes = True

class PlanetSchema(BaseModel):
    id: int
    name: str
    sector: str
    coords: List[int] # Expecting [x, y]
    risk: str
    activity: str
    class Config:
        from_attributes = True

# 5. SEEDING FUNCTIONS
def seed_database():
    db = SessionLocal()
    try:
        # Seed Crimson Dawn User
        existing_user = db.query(User).filter(User.username == "crimson_dawn").first()
        if not existing_user:
            print("⚡ CREATING CRIMSON DAWN ADMIN ACCOUNT...")
            syndicate_admin = User(username="crimson_dawn", hashed_password=Hash.bcrypt("syndicate"))
            db.add(syndicate_admin)
            db.commit()
     # 2. Seed Admin
        existing_admin = db.query(User).filter(User.username == "admin").first()
        if not existing_admin:
            print("⚡ CREATING EMPIRE ADMIN ACCOUNT...")
            # username: admin, password: admin
            admin_user = User(username="admin", hashed_password=Hash.bcrypt("admin"))
            db.add(admin_user)
            db.commit()
            
        # Seed Bounties
        if db.query(Bounty).count() == 0:
            print("🌱 Seeding Bounties...")
            bounties = [
                Bounty(name="Gen. Han Solo (Carbonite)", region="The Vermillion", reward=10000000, status="Auction", type="Syndicate"),
                Bounty(name="Boba Fett", region="Nar Shaddaa", reward=500000, status="High Priority", type="Syndicate"),
                Bounty(name="Governor Pryce", region="Lothal", reward=50000, status="Active", type="Syndicate"),
                Bounty(name="Vizago", region="Outer Rim", reward=12000, status="Completed", type="Syndicate"),
                Bounty(name="Qi'ra", region="Unknown", reward=1000000, status="Active", type="Empire"),
                Bounty(name="Luke Skywalker", region="Jekara Sector", reward=500000, status="Active", type="Empire"),
            ]
            db.add_all(bounties)
            db.commit()

        # Seed Transactions
        if db.query(Transaction).count() == 0:
            print("🌱 Seeding Finance Ledger...")
            txs = [
                Transaction(description="Sector 7 Tax Collection", amount=1500000, date="2025-10-01", category="Revenue"),
                Transaction(description="TIE Defender Research", amount=-450000, date="2025-10-02", category="R&D"),
                Transaction(description="Spice Shipment (Kessel)", amount=300000, date="3 ABY-04-14", category="Smuggling"),
                Transaction(description="Port Authority Bribe", amount=-15000, date="3 ABY-04-14", category="Overhead"),
                Transaction(description="Jabba's Entry Fee", amount=100000, date="3 ABY-04-15", category="Auction"),
                Transaction(description="Security Droids (Vermillion)", amount=-45000, date="3 ABY-04-14", category="Defense"),
            ]
            db.add_all(txs)
            db.commit()

        # Seed Operatives
        if db.query(Operative).count() == 0:
            print("🌱 Seeding Spy Network...")
            ops = [
                Operative(name="Margo", location="The Vermillion", role="Comms Officer", status="Active", cover="N/A", image="/operatives/margo.jpg"),
                Operative(name="Unit 88", location="Imperial Palace", role="Informant", status="Deep Cover", cover="Protocol Droid", image="/operatives/unit88.jpg"),
                Operative(name="Beilert Valance", location="Executor", role="Unwitting Asset", status="Compromised", cover="Bounty Hunter", image="/operatives/beilertvalance.jpg"),
                Operative(name="Ochi of Bestoon", location="Outer Rim", role="Assassin", status="Active", cover="Sith Loyalist", image="/operatives/ochi.jpg"),
                Operative(name="Admiral Piett", location="Executor", role="Admiral", status="Active", cover="N/A", image="/operatives/piett.jpg"),
            ]
            db.add_all(ops)
            db.commit()

        # Seed Heat Map
        if db.query(Planet).count() == 0:
            print("🌱 Seeding Galaxy Map...")
            planets = [
                Planet(name="Coruscant", sector="Core", coord_x=50, coord_y=50, risk="Critical", activity="Imperial Center"),
                Planet(name="Tatooine", sector="Outer Rim", coord_x=80, coord_y=80, risk="Medium", activity="Hutt Dispute"),
                Planet(name="Lothal", sector="Outer Rim", coord_x=75, coord_y=20, risk="Low", activity="Factory Shutdown"),
                Planet(name="Jekara", sector="Unknown", coord_x=20, coord_y=30, risk="Critical", activity="Crimson Dawn Auction"),
                Planet(name="Kessel", sector="Outer Rim", coord_x=85, coord_y=40, risk="High", activity="Spice Lane Patrols"),
                Planet(name="Corellia", sector="Core", coord_x=55, coord_y=60, risk="High", activity="Shipyard Inspection"),
            ]
            db.add_all(planets)
            db.commit()
            
    except Exception as e:
        print(f"Error seeding database: {e}")
    finally:
        db.close()

# Run Seed
seed_database()


# 6. API ENDPOINTS

@app.get("/")
def read_root():
    return {"message": "Welcome to Hololab API"}

# --- AUTH ---
@app.post('/user', response_model=schemas.UserShow)
def create_user(request: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = User(username=request.username, hashed_password=Hash.bcrypt(request.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")
    if not Hash.verify(user.hashed_password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect Password")
    access_token = token_auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# --- INVENTORY ---
@app.get("/items/", response_model=list[schemas.Item])
def get_items(db: Session = Depends(get_db)):
    return db.query(Item).all()

@app.post("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemBase, db: Session = Depends(get_db)):
    db_item = Item(name=item.name, description=item.description, price=item.price)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"message": "item deleted"}

# --- BOUNTIES (Real DB) ---
@app.get("/bounties", response_model=List[BountySchema])
def get_bounties(db: Session = Depends(get_db)):
    return db.query(Bounty).all()

@app.post("/bounties", response_model=BountySchema)
def create_bounty(bounty: BountyCreate, db: Session = Depends(get_db)):
    new_bounty = Bounty(
        name=bounty.name,
        region=bounty.region,
        reward=bounty.reward,
        status="Active",
        type=bounty.type
    )
    db.add(new_bounty)
    db.commit()
    db.refresh(new_bounty)
    return new_bounty

@app.put("/bounties/{bounty_id}")
def update_bounty_status(bounty_id: int, status: str = Body(..., embed=True), db: Session = Depends(get_db)):
    bounty = db.query(Bounty).filter(Bounty.id == bounty_id).first()
    if not bounty:
        raise HTTPException(status_code=404, detail="Bounty not found")
    bounty.status = status
    db.commit()
    return bounty

# --- FINANCE (Real DB) ---
@app.get("/finance", response_model=List[TransactionSchema])
def get_finance(db: Session = Depends(get_db)):
    return db.query(Transaction).all()

# --- OPERATIVES (Real DB) ---
@app.get("/operatives", response_model=List[OperativeSchema])
def get_operatives(db: Session = Depends(get_db)):
    return db.query(Operative).all()

# --- HEAT MAP (Real DB) ---
@app.get("/heat", response_model=List[PlanetSchema])
def get_heat_map(db: Session = Depends(get_db)):
    planets = db.query(Planet).all()
    # Format conversion: SQL (x, y) -> API ([x, y])
    formatted_planets = []
    for p in planets:
        formatted_planets.append({
            "id": p.id,
            "name": p.name,
            "sector": p.sector,
            "coords": [p.coord_x, p.coord_y], 
            "risk": p.risk,
            "activity": p.activity
        })
    return formatted_planets