from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.models.profile_model import Profile
from app.models.user_model import User

from app.schemas.profile_schema import UpdateProfile

from app.dependencies.auth import get_current_user


router = APIRouter(
    prefix="/profiles",
    tags=["Profiles"]
)


@router.get("/me")
def get_my_profile(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    user_id = UUID(user["sub"])

    auth_user = (
        db.query(User)
        .filter(User.uuid == user_id)
        .first()
    )

    if not auth_user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    profile = (
        db.query(Profile)
        .filter(Profile.user_id == user_id)
        .first()
    )

    if not profile:

        profile = Profile(
            user_id=user_id,
            username=auth_user.username
        )

        db.add(profile)

        db.commit()

        db.refresh(profile)

    return {
        "user_id": str(profile.user_id),
        "username": profile.username,
        "email": auth_user.email,
        "bio": profile.bio,
        "instagram": profile.instagram,
        "website": profile.website,
        "joined_at": auth_user.created_at
    }


@router.get("/username/{username}")
def get_profile_by_username(
    username: str,
    db: Session = Depends(get_db)
):

    profile = (
        db.query(Profile)
        .filter(Profile.username == username)
        .first()
    )

    if not profile:

        auth_user = (
            db.query(User)
            .filter(User.username == username)
            .first()
        )

        if not auth_user:

            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        profile = Profile(
            user_id=auth_user.uuid,
            username=auth_user.username
        )

        db.add(profile)

        db.commit()

        db.refresh(profile)

    auth_user = (
        db.query(User)
        .filter(User.uuid == profile.user_id)
        .first()
    )

    return {
        "user_id": str(profile.user_id),
        "username": profile.username,
        "bio": profile.bio,
        "instagram": profile.instagram,
        "website": profile.website,
        "joined_at": auth_user.created_at
    }


@router.put("/me")
def update_profile(
    updated_profile: UpdateProfile,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    user_id = UUID(user["sub"])

    auth_user = (
        db.query(User)
        .filter(User.uuid == user_id)
        .first()
    )

    if not auth_user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    profile = (
        db.query(Profile)
        .filter(Profile.user_id == user_id)
        .first()
    )

    if not profile:

        profile = Profile(
            user_id=user_id,
            username=auth_user.username
        )

        db.add(profile)

        db.commit()

        db.refresh(profile)

    if updated_profile.bio is not None:
        profile.bio = updated_profile.bio

    if updated_profile.instagram is not None:
        profile.instagram = updated_profile.instagram

    if updated_profile.website is not None:
        profile.website = updated_profile.website

    db.commit()

    db.refresh(profile)

    return {
        "message": "Profile updated",
        "profile": {
            "username": profile.username,
            "bio": profile.bio,
            "instagram": profile.instagram,
            "website": profile.website
        }
    }