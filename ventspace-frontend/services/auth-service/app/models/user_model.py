from sqlalchemy import Column, String, Boolean, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.db.database import Base
import uuid


class User(Base):

    __tablename__ = "users"

    uuid = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    username = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    is_active = Column(Boolean, default=True)

    created_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now()
    )