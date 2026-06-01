from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import engine, Base
from app.models.post_model import Post
from app.routes.post_routes import router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Blog Service"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def home():
    return {
        "message": "Blog service running"
    }

app.include_router(router)