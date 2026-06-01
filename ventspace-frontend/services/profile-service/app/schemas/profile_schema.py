from pydantic import BaseModel


class UpdateProfile(BaseModel):

    bio: str | None = None

    instagram: str | None = None

    website: str | None = None