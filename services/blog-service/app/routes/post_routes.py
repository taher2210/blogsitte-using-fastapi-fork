from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.models.post_model import Post

from app.schemas.post_schema import (
    CreatePost,
    UpdatePost
)

from app.dependencies.auth import get_current_user


router = APIRouter(
    prefix="/posts",
    tags=["Posts"]
)


@router.post("/")
def create_post(
    post: CreatePost,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    new_post = Post(

        user_id=user["sub"],

        title=post.title,

        content=post.content
    )

    db.add(new_post)

    db.commit()

    db.refresh(new_post)

    return new_post


@router.get("/")
def get_posts(
    db: Session = Depends(get_db)
):

    posts = db.query(Post).all()

    return posts


@router.get("/{post_id}")
def get_post(
    post_id: str,
    db: Session = Depends(get_db)
):

    post = db.query(Post).filter(
        Post.id == post_id
    ).first()

    if not post:

        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    return post


@router.put("/{post_id}")
def update_post(
    post_id: str,
    updated_post: UpdatePost,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    post = db.query(Post).filter(
        Post.id == post_id
    ).first()

    if not post:

        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    if str(post.user_id) != user["sub"]:

        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    post.title = updated_post.title
    post.content = updated_post.content

    db.commit()

    db.refresh(post)

    return post


@router.delete("/{post_id}")
def delete_post(
    post_id: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    post = db.query(Post).filter(
        Post.id == post_id
    ).first()

    if not post:

        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    if str(post.user_id) != user["sub"]:

        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    db.delete(post)

    db.commit()

    return {
        "message": "Post deleted successfully"
    }