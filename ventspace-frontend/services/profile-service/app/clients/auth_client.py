import os
import requests

from dotenv import load_dotenv

load_dotenv()

AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL")


def user_exists(user_id: str) -> bool:

    try:

        response = requests.get(
            f"{AUTH_SERVICE_URL}/users/{user_id}"
        )

        return response.status_code == 200

    except Exception:

        return False