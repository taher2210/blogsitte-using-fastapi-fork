from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],      # Allow all methods
    allow_headers=["*"],      # Allow all headers
)

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
