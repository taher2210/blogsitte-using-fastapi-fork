from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import DateTime

from sqlalchemy.dialects.postgresql import UUID

from app.database.db import Base


class User(Base):

    __tablename__ = "users"

    uuid = Column(
        UUID(as_uuid=True),
        primary_key=True
    )

    username = Column(String)

    email = Column(String)

    is_active = Column(Boolean)

    created_at = Column(DateTime)