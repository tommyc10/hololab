from fastapi import FastAPI
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
import models, schemas, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

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

