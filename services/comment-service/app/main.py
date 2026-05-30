from fastapi import FastAPI

from app.routes.comment_routes import router

from app.db.database import (
    Base,
    engine
)

# IMPORTANT
from app.models.comment_model import Comment
from app.models.reaction_model import Reaction

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "Comment Service Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }