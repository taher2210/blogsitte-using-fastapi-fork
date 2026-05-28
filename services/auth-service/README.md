# Auth Service

Authentication microservice for the Blogging Platform built using FastAPI, PostgreSQL, JWT Authentication, and Argon2 password hashing.

---

## Tech Stack

* FastAPI
* PostgreSQL (Supabase)
* SQLAlchemy
* JWT Authentication
* Argon2 Password Hashing
* Docker
* Render Deployment

---

## Features

* User Signup
* User Login
* JWT Access Tokens
* Refresh Tokens
* Protected Routes
* Password Hashing with Argon2
* PostgreSQL Integration
* Swagger API Docs

---

## Project Structure

```text
auth-service/
│
├── app/
│   │
│   ├── config/
│   │   └── settings.py
│   │
│   ├── db/
│   │   └── database.py
│   │
│   ├── middleware/
│   │   └── auth_middleware.py
│   │
│   ├── models/
│   │   └── user_model.py
│   │
│   ├── routes/
│   │   └── auth_routes.py
│   │
│   ├── schemas/
│   │   └── user_schema.py
│   │
│   ├── services/
│   │   └── auth_service.py
│   │
│   ├── utils/
│   │   │
│   │   ├── hash.py
│   │   └── token.py
│   │
│   └── main.py
│
├── .env
├── .gitignore
├── Dockerfile
├── requirements.txt
└── README.md
```

---

## Environment Variables

Create a `.env` file inside `auth-service/`

```env
DATABASE_URL=YOUR_SUPABASE_DATABASE_URL

JWT_SECRET=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/abhipandey11/blogsitte-using-fastapi.git
```

### Move Into Auth Service

```bash
cd services/auth-service
```

### Create Virtual Environment

```bash
python -m venv .venv
```

### Activate Virtual Environment

#### Windows

```bash
.venv\Scripts\activate
```

#### Linux/Mac

```bash
source .venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Run Locally

```bash
uvicorn app.main:app --reload
```

Server runs on:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

## API Routes

### Signup

```http
POST /auth/signup
```

### Login

```http
POST /auth/login
```

### Current User

```http
GET /auth/me
```

### Refresh Token

```http
POST /auth/refresh
```

### Logout

```http
POST /auth/logout
```

---

## Authentication Flow

```text
User Signup
    ↓
Password Hashed using Argon2
    ↓
User Login
    ↓
JWT Access Token Generated
    ↓
Protected Routes use Bearer Token Authentication
```

---

## Deployment

The auth service is deployed using:

* Docker
* Render

Deployment URL:

```text
https://blogsitte-using-fastapi.onrender.com
```

Swagger Docs:

```text
https://blogsitte-using-fastapi.onrender.com/docs
```

---

## Security Features

* Argon2 Password Hashing
* JWT Authentication
* Protected Routes
* Bearer Token Verification
* Duplicate Email Validation

---

## Future Improvements

* Refresh Token Storage
* Email Verification
* Role-Based Access Control
* Redis Token Blacklisting
* OAuth Authentication
* Rate Limiting

---

## Author

Built as part of a Microservices Blogging Platform project.
