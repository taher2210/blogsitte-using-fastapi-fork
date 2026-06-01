from sqlalchemy import Column, String, TEXT, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.db.database import Base
import uuid


class Comment(Base):

    __tablename__ = "comments"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    blog_id = Column(
        UUID(as_uuid=True),
        nullable=False
    )

    author_id = Column(
        UUID(as_uuid=True),
        nullable=False
    )

    content = Column(
        TEXT,
        nullable=False
    )

    parent_comment_id = Column(
        UUID(as_uuid=True),
        nullable=True
    )

    created_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )