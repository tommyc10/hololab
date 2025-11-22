from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware 
from sqlalchemy.orm import Session
import models, schemas, database


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
