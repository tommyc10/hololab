from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    password: str

class UserShow(BaseModel):
    username: str



class ItemBase(BaseModel):
    name: str
    description: str | None = None
    price: int  # <--- MAKE SURE THIS IS HERE!
    is_active: bool = True

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int

    class Config:
        from_attributes = True