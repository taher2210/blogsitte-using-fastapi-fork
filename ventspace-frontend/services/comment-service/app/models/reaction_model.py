from sqlalchemy import (
    Column,
    String,
    UniqueConstraint
)

from sqlalchemy.dialects.postgresql import UUID

from app.db.database import Base

import uuid


class Reaction(Base):

    __tablename__ = "comment_reactions"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    comment_id = Column(
        UUID(as_uuid=True),
        nullable=False
    )

    user_id = Column(
        UUID(as_uuid=True),
        nullable=False
    )

    reaction_type = Column(
        String,
        nullable=False
    )

    __table_args__ = (
        UniqueConstraint(
            "comment_id",
            "user_id",
            name="unique_comment_reaction"
        ),
    )