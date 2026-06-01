from fastapi import HTTPException
from fastapi import Depends

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

from jose import jwt
from jose import JWTError

from dotenv import load_dotenv

import os

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")
ALGORITHM = os.getenv("ALGORITHM")

security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=[ALGORITHM]
        )

        if payload.get("type") != "access":

            raise HTTPException(
                status_code=401,
                detail="Invalid token type"
            )

        return {
            "sub": payload["sub"]
        }

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )