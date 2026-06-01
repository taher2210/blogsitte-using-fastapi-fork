# Comment Service

Comment microservice for the Blogging Platform.

## Features

* Create comment
* Update own comment
* Delete own comment
* Fetch comments by blog
* Nested replies
* Comment tree structure
* Like / Dislike reactions
* One reaction per user
* Pagination support

## Tech Stack

* FastAPI
* PostgreSQL (Supabase)
* SQLAlchemy
* JWT Authentication

## Run Locally

```bash
python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload --port 8002
```

## Environment Variables

DATABASE_URL=
JWT_SECRET=
ALGORITHM=HS256

## API Endpoints

POST /comments

GET /comments

GET /comments/{comment_id}

PUT /comments/{comment_id}

DELETE /comments/{comment_id}

POST /comments/reply

GET /comments/blog/{blog_id}

GET /comments/blog/{blog_id}/tree

POST /comments/{comment_id}/reaction

GET /comments/{comment_id}/reactions
