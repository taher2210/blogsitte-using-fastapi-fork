from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.models.post_model import Post
from app.models.user_model import User

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

    result = []

    for post in posts:

        author = db.query(User).filter(
            User.uuid == post.user_id
        ).first()

        result.append({
            "id": str(post.id),
            "user_id": str(post.user_id),
            "username": (
                author.username
                if author
                else "Unknown"
            ),
            "title": post.title,
            "content": post.content,
            "created_at": post.created_at,
            "updated_at": post.updated_at
        })

    return result


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

    author = db.query(User).filter(
        User.uuid == post.user_id
    ).first()

    return {
        "id": str(post.id),
        "user_id": str(post.user_id),
        "username": (
            author.username
            if author
            else "Unknown"
        ),
        "title": post.title,
        "content": post.content,
        "created_at": post.created_at,
        "updated_at": post.updated_at
    }


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