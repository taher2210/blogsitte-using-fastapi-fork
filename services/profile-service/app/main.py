from fastapi import FastAPI

from app.database.db import Base
from app.database.db import engine

from app.models.profile_model import Profile
from app.models.user_model import User

from app.routes.profile_routes import router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Profile Service"
)


@app.get("/")
def home():

    return {
        "message": "Profile service running"
    }


@app.get("/health")
def health():

    return {
        "status": "ok"
    }


app.include_router(router)