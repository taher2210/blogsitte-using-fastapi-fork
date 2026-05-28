from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.middleware.auth_middleware import verify_token
from app.db.database import get_db
from app.schemas.user_schema import UserSignup, UserLogin
from app.services.auth_service import create_user, authenticate_user
from jose import jwt, JWTError
from app.utils.token import create_access_token
import os
from app.models.user_model import User

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):

    new_user = create_user(
        db,
        user.username,
        user.email,
        user.password
    )

    return {
        "message": "User created",
        "user_id": str(new_user.uuid)
    }


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    tokens = authenticate_user(
        db,
        user.email,
        user.password
   )

    if not tokens:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return tokens

@router.get("/me")
def get_current_user(
    payload: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.uuid == payload["sub"]
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user

@router.post("/refresh")
def refresh_token(payload: dict = Depends(verify_token)):

    if payload.get("type") != "refresh":

        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token"
        )

    access_token = create_access_token({
        "sub": payload["sub"]
    })

    return {
        "access_token": access_token
    }

@router.post("/logout")
def logout():

    return {
        "message": "Logout successful"
    }