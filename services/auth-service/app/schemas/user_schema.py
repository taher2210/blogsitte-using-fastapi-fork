from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime


class UserSignup(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    uuid: UUID
    username: str
    email: EmailStr
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True