from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from fastapi import Query
from app.services.comment_service import (
    create_comment,
    get_all_comments,
    get_comment_by_id,
    update_comment,
    delete_comment,
    get_comments_by_blog,
    get_comment_tree_by_blog,
    create_reply,
    react_to_comment,
    get_reaction_counts
)
from app.schemas.comment_schema import (
    CommentCreate,
    CommentUpdate,
    ReplyCreate,
    ReactionRequest
)
from app.middleware.auth_middleware import verify_token

router = APIRouter(
    prefix="/comments",
    tags=["Comments"]
)


@router.post("/")
def create_new_comment(
    comment: CommentCreate,
    payload: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    return create_comment(
        db,
        comment.blog_id,
        payload["sub"],
        comment.content
    )


@router.get("/")
def fetch_comments(
    db: Session = Depends(get_db)
):

    return get_all_comments(db)


@router.get("/{comment_id}")
def fetch_comment(
    comment_id: str,
    db: Session = Depends(get_db)
):

    return get_comment_by_id(
        db,
        comment_id
    )


@router.put("/{comment_id}")
def edit_comment(
    comment_id: str,
    comment: CommentUpdate,
    payload: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    return update_comment(
        db,
        comment_id,
        payload["sub"],
        comment.content
    )


@router.delete("/{comment_id}")
def remove_comment(
    comment_id: str,
    payload: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    return delete_comment(
        db,
        comment_id,
        payload["sub"]
    )

@router.get("/blog/{blog_id}")
def fetch_blog_comments(
    blog_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(5, ge=1, le=50),
    db: Session = Depends(get_db)
):

    return get_comments_by_blog(
        db,
        blog_id,
        page,
        limit
    )

@router.get("/blog/{blog_id}/tree")
def fetch_comment_tree(
    blog_id: str,
    db: Session = Depends(get_db)
):

    return get_comment_tree_by_blog(
        db,
        blog_id
    )

@router.post("/reply")
def reply_to_comment(
    comment: ReplyCreate,
    payload: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    return create_reply(
        db,
        comment.blog_id,
        comment.parent_comment_id,
        payload["sub"],
        comment.content
    )

@router.post("/{comment_id}/reaction")
def react(
    comment_id: str,
    body: ReactionRequest,
    payload: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    return react_to_comment(
        db,
        comment_id,
        payload["sub"],
        body.reaction
    )

@router.get("/{comment_id}/reactions")
def get_reactions(
    comment_id: str,
    db: Session = Depends(get_db)
):

    return get_reaction_counts(
        db,
        comment_id
    )