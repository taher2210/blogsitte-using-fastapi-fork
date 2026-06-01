import os
import requests

AUTH_SERVICE_URL = os.getenv(
    "AUTH_SERVICE_URL"
)


def get_username(user_id):

    try:

        response = requests.get(
            f"{AUTH_SERVICE_URL}/auth/users/{user_id}",
            timeout=5
        )

        if response.status_code == 200:

            return response.json().get(
                "username",
                "Unknown"
            )

    except Exception as e:

        print(
            f"Username lookup failed: {e}"
        )

    return "Unknown"