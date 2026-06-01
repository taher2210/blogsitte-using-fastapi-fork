from sqlalchemy.orm import Session
from app.models.user_model import User
from app.utils.hash import hash_password, verify_password
from fastapi import HTTPException
from app.utils.token import (
    create_access_token, create_refresh_token )


def create_user(db: Session, username, email, password):

    hashed_password = hash_password(password)

    user = User(
        username=username,
        email=email,
        password=hashed_password
    )
    existing_user = db.query(User).filter(
        User.email == email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
       )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user


def authenticate_user(db: Session, email, password):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(user.password, password):
        return None

    access_token = create_access_token({
       "sub": str(user.uuid)
    })

    refresh_token = create_refresh_token({
        "sub": str(user.uuid)
    })

    return {
        "access_token": access_token,
        "refresh_token": refresh_token
    }