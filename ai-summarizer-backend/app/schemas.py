from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# --- Schema for the /predict route ---
class SummaryRequest(BaseModel):
    text: str

# --- Schemas for the /users routes ---
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# --- Schema for returning user data (without password) ---
class User(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True # Pydantic v2
        # orm_mode = True # Pydantic v1

# --- Schema for returning history data ---
class HistoryResponse(BaseModel):
    id: int
    text: str
    summary: str
    created_at: datetime

    class Config:
        from_attributes = True

# --- Schema for the /login response ---
class Token(BaseModel):
    access_token: str
    token_type: str

# --- Schema for the token payload ---
class TokenData(BaseModel):
    user_id: Optional[int] = None