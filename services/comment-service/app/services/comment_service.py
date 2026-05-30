from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.comment_model import Comment
from app.models.reaction_model import Reaction
from app.utils.blog_utils import blog_exists


def create_comment(
    db: Session,
    blog_id,
    author_id,
    content
):
    if not blog_exists(blog_id):

        raise HTTPException(
            status_code=404,
            detail="Blog not found"
        )
    comment = Comment(
        blog_id=blog_id,
        author_id=author_id,
        content=content
    )

    db.add(comment)

    db.commit()

    db.refresh(comment)

    return comment


def get_all_comments(
    db: Session
):

    return db.query(Comment).all()


def get_comment_by_id(
    db: Session,
    comment_id
):

    comment = db.query(Comment).filter(
        Comment.id == comment_id
    ).first()

    if not comment:
        raise HTTPException(
            status_code=404,
            detail="Comment not found"
        )

    return comment


def update_comment(
    db: Session,
    comment_id,
    user_id,
    content
):

    comment = db.query(Comment).filter(
        Comment.id == comment_id
    ).first()

    if not comment:
        raise HTTPException(
            status_code=404,
            detail="Comment not found"
        )

    if str(comment.author_id) != str(user_id):
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    comment.content = content

    db.commit()

    db.refresh(comment)

    return comment


def delete_comment(
    db: Session,
    comment_id,
    user_id
):

    comment = db.query(Comment).filter(
        Comment.id == comment_id
    ).first()

    if not comment:
        raise HTTPException(
            status_code=404,
            detail="Comment not found"
        )

    if str(comment.author_id) != str(user_id):
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    db.delete(comment)

    db.commit()

    return {
        "message": "Comment deleted"
    }

def get_comments_by_blog(
    db: Session,
    blog_id,
    page=1,
    limit=5
):

    offset = (page - 1) * limit

    comments = (
        db.query(Comment)
        .filter(
            Comment.blog_id == blog_id,
            Comment.parent_comment_id == None
        )
        .order_by(Comment.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    total_comments = (
        db.query(Comment)
        .filter(
            Comment.blog_id == blog_id,
            Comment.parent_comment_id == None
        )
        .count()
    )

    return {
        "comments": comments,
        "page": page,
        "limit": limit,
        "total": total_comments,
        "has_more": offset + limit < total_comments
    }

def create_reply(
    db: Session,
    blog_id,
    parent_comment_id,
    author_id,
    content
):

    reply = Comment(
        blog_id=blog_id,
        parent_comment_id=parent_comment_id,
        author_id=author_id,
        content=content
    )

    db.add(reply)

    db.commit()

    db.refresh(reply)

    return reply

def build_comment_tree(comments):

    comment_map = {}

    roots = []

    for comment in comments:

        comment_dict = {
            "id": str(comment.id),
            "blog_id": str(comment.blog_id),
            "author_id": str(comment.author_id),
            "content": comment.content,
            "created_at": comment.created_at,
            "parent_comment_id": (
                str(comment.parent_comment_id)
                if comment.parent_comment_id
                else None
            ),
            "replies": []
        }

        comment_map[str(comment.id)] = comment_dict

    for comment in comments:

        current = comment_map[str(comment.id)]

        if comment.parent_comment_id:

            parent = comment_map.get(
                str(comment.parent_comment_id)
            )

            if parent:
                parent["replies"].append(current)

        else:
            roots.append(current)

    return roots

def get_comment_tree_by_blog(
    db: Session,
    blog_id
):

    comments = db.query(Comment).filter(
        Comment.blog_id == blog_id
    ).all()

    return build_comment_tree(comments)

def react_to_comment(
    db: Session,
    comment_id,
    user_id,
    reaction_type
):

    existing = db.query(Reaction).filter(
        Reaction.comment_id == comment_id,
        Reaction.user_id == user_id
    ).first()

    if existing:

        if existing.reaction_type == reaction_type:

            db.delete(existing)

            db.commit()

            return {
                "message": "Reaction removed"
            }

        existing.reaction_type = reaction_type

        db.commit()

        return {
            "message": "Reaction updated"
        }

    reaction = Reaction(
        comment_id=comment_id,
        user_id=user_id,
        reaction_type=reaction_type
    )

    db.add(reaction)

    db.commit()

    return {
        "message": "Reaction added"
    }

def get_reaction_counts(
    db: Session,
    comment_id
):

    likes = db.query(Reaction).filter(
        Reaction.comment_id == comment_id,
        Reaction.reaction_type == "LIKE"
    ).count()

    dislikes = db.query(Reaction).filter(
        Reaction.comment_id == comment_id,
        Reaction.reaction_type == "DISLIKE"
    ).count()

    return {
        "likes": likes,
        "dislikes": dislikes
    }