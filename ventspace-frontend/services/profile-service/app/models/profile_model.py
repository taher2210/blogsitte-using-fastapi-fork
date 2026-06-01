from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.sql import func

import uuid

from app.database.db import Base


class Profile(Base):

    __tablename__ = "profiles"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id = Column(
        UUID(as_uuid=True),
        unique=True,
        nullable=False
    )

    username = Column(
        String,
        unique=True,
        nullable=False
    )

    bio = Column(Text)

    instagram = Column(String)

    website = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )