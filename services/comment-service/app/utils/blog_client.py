import os
import requests

BLOG_SERVICE_URL = os.getenv("BLOG_SERVICE_URL")


def blog_exists(blog_id):

    try:

        response = requests.get(
            f"{BLOG_SERVICE_URL}/posts/{blog_id}",
            timeout=5
        )

        return response.status_code == 200

    except requests.RequestException:
        return False