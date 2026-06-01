import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import blogApi from "../api/blog";

interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  username: string;
  created_at: string;
}

interface PostCardProps {
  post: Post;
  currentUserId: string;
}

export function PostCard({
  post,
  currentUserId
}: PostCardProps) {

  const navigate = useNavigate();

  const isOwner =
    currentUserId === post.user_id;

  const preview =
    post.content.length > 180
      ? `${post.content.slice(0, 180)}...`
      : post.content;

  async function handleDelete() {

    const confirmed =
      window.confirm(
        "Delete this post?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await blogApi.delete(
        `/posts/${post.id}`
      );

      window.location.reload();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete post"
      );

    }
  }

  function handleEdit() {

    navigate(
      `/posts/${post.id}/edit`
    );

  }

  return (
    <article className="py-5 border-b border-border">

      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">

          <Link to={`/posts/${post.id}`}>

            <h2 className="text-lg font-semibold leading-6 cursor-pointer hover:text-primary transition-colors">
              {post.title}
            </h2>

          </Link>

          <p className="mt-2 text-sm text-muted-foreground leading-6">
            {preview}
          </p>

          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground font-mono">

            <span>
              @{post.username}
            </span>

            <span>•</span>

            <span>
              {new Date(
                post.created_at
              ).toLocaleDateString()}
            </span>

          </div>

        </div>

        {isOwner && (

          <div className="flex gap-3 shrink-0">

            <button
              onClick={handleEdit}
              className="text-xs text-blue-500 hover:underline"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="text-xs text-red-500 hover:underline"
            >
              Delete
            </button>

          </div>

        )}

      </div>

    </article>
  );
}