import requests


def blog_exists(blog_id):

    response = requests.get(
        f"http://localhost:8002/blogs/{blog_id}"
    )

    return response.status_code == 200