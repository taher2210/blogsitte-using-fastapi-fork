from fastapi import FastAPI

from app.database.db import engine
from app.database.db import Base

from app.models.post_model import Post

from app.routes.post_routes import router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Blog Service"
)


@app.get("/")
def home():

    return {
        "message": "Blog service running"
    }


app.include_router(router)