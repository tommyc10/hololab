from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware 
from sqlalchemy.orm import Session
import models, schemas, database
from hashing import Hash
from fastapi.security import OAuth2PasswordRequestForm
import token_auth


models.Base.metadata.create_all(bind=database.engine)

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

@app.post('/user', response_model=schemas.UserShow)
def create_user(request: schemas.UserCreate, db: Session = Depends(get_db)):


        # --- ADD THIS DEBUG LINE ---
    print(f"DEBUG: Password to hash is: {request.password}")
    print(f"DEBUG: Type is: {type(request.password)}")
    # ---------------------------
    # 1. Check if user already exists (Optional but good practice)
    # (We will skip the check for now to keep it simple, database will error if duplicate)

    # 2. Create the new User object
    new_user = models.User(
        username=request.username, 
        hashed_password=Hash.bcrypt(request.password) # Scramble the password!
    )
    
    # 3. Add to DB and Commit
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # 4. Return the user (schema filters out the password)
    return new_user

@app.get("/")
def read_root():
    return {"message": "Welcome to Hololab"}

@app.post("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemBase, db: Session = Depends(get_db)):
    db_item = models.Item(
        name = item.name,
        description = item.description,
        price = item.price,
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.get("/items/", response_model=list[schemas.Item])
def get_items(db: Session = Depends(get_db)):
    items = db.query(models.Item).all()
    return items


@app.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):

    item = db.query(models.Item).filter(models.Item.id == item_id).first()

    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db.delete(item)
    db.commit()

    return {"message": "item deleted"}


@app.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")
    if not Hash.verify(user.hashed_password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect Password")

    access_token = token_auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
