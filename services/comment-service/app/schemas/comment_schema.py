from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Literal
from uuid import UUID

class ReplyCreate(BaseModel):
    blog_id: UUID
    parent_comment_id: UUID
    content: str


class CommentCreate(BaseModel):
    blog_id: UUID
    content: str


class CommentUpdate(BaseModel):
    content: str

class ReactionRequest(BaseModel):
    reaction: Literal["LIKE", "DISLIKE"]

class CommentResponse(BaseModel):
    id: UUID
    blog_id: UUID
    author_id: UUID
    content: str
    created_at: datetime

    class Config:
        from_attributes = True