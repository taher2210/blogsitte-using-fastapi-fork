from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class CreatePost(BaseModel):
    title: str
    content: str


class UpdatePost(BaseModel):
    title: str
    content: str


class PostResponse(BaseModel):

    id: UUID
    user_id: UUID
    title: str
    content: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True