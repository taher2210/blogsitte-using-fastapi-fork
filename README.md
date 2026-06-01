# 🚀 VentSpace

```text
┌──────────────────────────────────────────────────────────────┐
│ 🌐 LIVE APPLICATION                                          │
│                                                              │
│ https://ventspace-mu.vercel.app/                             │
│                                                              │
│ Backend services are hosted on Render's free tier.           │
│ Initial requests may take a few seconds while services       │
│ wake up from inactivity.                                     │
└──────────────────────────────────────────────────────────────┘
```

## Overview

VentSpace is a microservices-based discussion platform built to explore distributed system design, service-to-service communication, authentication, and cloud deployment.

Instead of building a traditional monolithic application, the platform is split into independent backend services, each responsible for a single domain. The frontend acts as an aggregation layer that communicates with multiple APIs to deliver a unified user experience.

The project demonstrates how authentication, content management, and user interactions can be separated into independently deployable services while still functioning as a single application.

---

## System Architecture

```text
                    ┌─────────────────┐
                    │  React Frontend │
                    │    (Vercel)     │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼

 ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
 │ Auth Service   │  │ Blog Service   │  │ Comment Service│
 │ FastAPI        │  │ FastAPI        │  │ FastAPI        │
 └───────┬────────┘  └───────┬────────┘  └────────┬───────┘
         │                   │                    │
         ▼                   ▼                    ▼

   PostgreSQL         PostgreSQL          PostgreSQL
```

Each service is independently deployed and responsible for its own business logic.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- FastAPI
- PostgreSQL
- SQLAlchemy
- JWT Authentication
- Argon2 Password Hashing

### Deployment

- Frontend → Vercel
- Backend Services → Render
- Database → PostgreSQL

---

## Services

### Authentication Service

Responsible for identity management and authentication.

#### Responsibilities

- User Registration
- User Login
- Password Hashing
- JWT Token Generation
- JWT Validation
- User Lookup APIs

#### Endpoints

```http
POST /auth/register
POST /auth/login
GET  /auth/me
GET  /auth/users/{uuid}
```

Passwords are hashed using Argon2 before being stored.

Authenticated users receive a JWT access token which is used across all protected services.

---

### Blog Service

Responsible for content creation and management.

#### Responsibilities

- Create Posts
- Read Posts
- Update Posts
- Delete Posts

#### Request Flow

```text
Frontend
    │
    ▼
Blog Service
    │
    ├── Validate JWT
    │
    ├── Extract User UUID
    │
    └── Store Post
```

Posts are linked to users through the UUID issued by the Authentication Service.

---

### Comment Service

Responsible for threaded discussions.

#### Responsibilities

- Create Comments
- Create Replies
- Build Comment Trees
- Manage Reactions

#### Request Flow

```text
Frontend
    │
    ▼
Comment Service
    │
    ├── Validate JWT
    │
    ├── Store Comment
    │
    ├── Resolve Username
    │
    └── Return Tree Structure
```

Supports unlimited nesting through recursive comment trees.

Example:

```text
Comment
 ├── Reply
 │    ├── Reply
 │    └── Reply
 └── Reply
```

---

## Authentication Flow

```text
User Login
     │
     ▼
Auth Service
     │
     ├── Verify Credentials
     │
     ├── Generate JWT
     │
     ▼
Access Token
     │
     ▼
Stored in Browser
     │
     ▼
Authorization: Bearer <token>
```

All protected endpoints validate the JWT before processing requests.

---

## Cross-Service User Resolution

Rather than duplicating user information across services, VentSpace stores only the user's UUID.

Example:

```text
Post
 └── user_id

Comment
 └── author_id
```

When comments or posts are requested:

```text
Comment Service
      │
      ▼
Auth Service
      │
      ▼
GET /auth/users/{uuid}
      │
      ▼
Username Returned
```

This keeps user information centralized and avoids data duplication.

---

## Database Design

### User

```text
uuid
username
email
password_hash
created_at
is_active
```

### Post

```text
id
user_id
title
content
created_at
updated_at
```

### Comment

```text
id
blog_id
author_id
parent_comment_id
content
created_at
updated_at
```

### Reaction

```text
id
comment_id
user_id
reaction_type
```

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authorization
- Protected Endpoints

### Posts

- Create Posts
- Edit Posts
- Delete Posts
- View Posts

### Comments

- Threaded Replies
- Recursive Comment Trees
- Username Resolution
- Nested Discussions

### Reactions

- Like Comments
- Dislike Comments

### Frontend

- Responsive UI
- Client-Side Routing
- Protected Routes
- Service Warm-Up Handling

---

## Challenges Solved

### Service-to-Service Communication

Implemented username resolution through inter-service API calls.

### Distributed Authentication

JWT validation is shared across multiple services while maintaining service isolation.

### Recursive Comment Trees

Implemented nested comment structures capable of handling arbitrary reply depth.

### Free-Tier Deployment Constraints

Handled service cold starts and startup delays associated with Render-hosted microservices.

---

## Future Improvements

- User Profiles
- Media Uploads
- Search Functionality
- Notification System
- WebSockets
- Redis Caching
- API Gateway
- Docker Support
- Kubernetes Deployment
- CI/CD Pipelines
- Distributed Logging & Monitoring

---

Built with React, FastAPI, PostgreSQL, and a microservices architecture.
