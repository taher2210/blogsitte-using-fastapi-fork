from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base
from app.database.db import engine

from app.models.profile_model import Profile
from app.models.user_model import User

from app.routes.profile_routes import router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Profile Service"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
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
