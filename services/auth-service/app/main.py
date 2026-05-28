from fastapi import FastAPI
from app.routes.auth_routes import router
from app.db.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(router)


@app.get("/")
def home():
    return {"message": "Auth Service Running"}