# Community Blogging Platform UI/UX

This is a code bundle for Community Blogging Platform UI/UX. The original project is available at https://www.figma.com/design/wT4OOllg2Rs6At098PCn49/Community-Blogging-Platform-UI-UX.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

---

# Blog Platform Backend

A microservice-based blogging platform built with FastAPI, PostgreSQL, SQLAlchemy, and JWT Authentication.

The backend is split into independent services, each responsible for a specific domain. All services communicate through a shared PostgreSQL database hosted on Supabase and are deployed independently on Render.

---

## Architecture

```text
Frontend
    │
    ▼
┌───────────────┐
│ Auth Service  │
└───────────────┘
        │
        ▼
┌───────────────┐
│ Blog Service  │
└───────────────┘
        │
        ▼
┌─────────────────┐
│ Profile Service │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ Comment Service │
└─────────────────┘
        │
        ▼
PostgreSQL (Supabase)
```

---

## Tech Stack

* FastAPI
* SQLAlchemy
* PostgreSQL (Supabase)
* JWT Authentication
* Argon2 Password Hashing
* Pydantic
* Render Deployment

---

# Auth Service

Handles authentication and authorization.

## Features

* User registration
* User login
* JWT access tokens
* JWT refresh tokens
* Password hashing using Argon2
* Protected user endpoint

## Endpoints

### Authentication

* POST `/auth/signup`
* POST `/auth/login`
* POST `/auth/refresh`
* POST `/auth/logout`

### User

* GET `/auth/me`

---

# Blog Service

Responsible for blog post management.

## Features

* Create posts
* Fetch all posts
* Fetch individual posts
* Update posts
* Delete posts
* Ownership verification using JWT

## Endpoints

### Posts

* POST `/posts`
* GET `/posts`
* GET `/posts/{post_id}`
* PUT `/posts/{post_id}`
* DELETE `/posts/{post_id}`

---

# Profile Service

Responsible for user profile management.

## Features

* View own profile
* View public profiles
* Update profile
* Username-based profile URLs
* Lazy profile creation
* Social links support

## Stored Data

* user_id
* username
* bio
* instagram
* website
* created_at
* updated_at

## Endpoints

### Profiles

* GET `/profiles/me`
* PUT `/profiles/me`
* GET `/profiles/username/{username}`

---

# Comment Service

Responsible for discussions and nested conversations.

## Features

* Create comments
* Edit comments
* Delete comments
* Nested replies
* Comment trees
* Pagination
* Like / Dislike reactions

## Endpoints

### Comments

* POST `/comments`
* GET `/comments`
* GET `/comments/{comment_id}`
* PUT `/comments/{comment_id}`
* DELETE `/comments/{comment_id}`

### Blog Comments

* GET `/comments/blog/{blog_id}`
* GET `/comments/blog/{blog_id}/tree`

### Replies

* POST `/comments/reply`

### Reactions

* POST `/comments/{comment_id}/reaction`
* GET `/comments/{comment_id}/reactions`

---

# Database

## Users

```text
uuid
username
email
password
is_active
created_at
```

## Profiles

```text
id
user_id
username
bio
instagram
website
created_at
updated_at
```

## Posts

```text
id
user_id
title
content
created_at
updated_at
```

## Comments

```text
id
blog_id
user_id
parent_comment_id
content
created_at
updated_at
```

---

# Authentication Flow

```text
User Signup
      │
      ▼
User Login
      │
      ▼
Access Token + Refresh Token
      │
      ▼
Protected Endpoints
```

JWT payload:

```json
{
  "sub": "user_uuid",
  "type": "access"
}
```

---

# Local Development

Install dependencies:

```bash
pip install -r requirements.txt
```

Run service:

```bash
uvicorn app.main:app --reload
```

Swagger documentation:

```text
http://localhost:8000/docs
```

---

# Environment Variables

```env
DATABASE_URL=

JWT_SECRET=

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# Deployment

All services are deployed independently using Render.

Typical start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

---

# Future Improvements

* Like/Dislike Microservice
* Notification Service
* Search Service
* User Following System
* Bookmarks
* Media Uploads
* Real-Time Notifications
* WebSocket Chat
* Activity Feed
* Recommendation Engine
* API Gateway
* Docker & Kubernetes Deployment

---

Built using FastAPI microservices as a learning project.
