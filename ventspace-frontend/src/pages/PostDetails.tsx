// src/pages/PostDetails.tsx

import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import blogApi from "../api/blog";
import commentApi from "../api/comment";

import {
  CommentItem,
  Comment
} from "../components/CommentItem";

interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  username: string;
  created_at: string;
}

export function PostDetails() {

  const { id } = useParams();

  const [post, setPost] =
    useState<Post | null>(null);

  const [comments, setComments] =
    useState<Comment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [commentText, setCommentText] =
    useState("");

  useEffect(() => {

    if (!id) return;

    fetchPost();
    fetchComments();

  }, [id]);

  async function fetchPost() {

    try {

      const response =
        await blogApi.get(
          `/posts/${id}`
        );

      setPost(response.data);

    } catch (error) {

      console.error(
        "Failed to fetch post",
        error
      );

    }

  }

  async function fetchComments() {

    try {

      const response =
        await commentApi.get(
          `/comments/blog/${id}/tree`
        );

      setComments(
        response.data
      );

    } catch (error) {

      console.error(
        "Failed to fetch comments",
        error
      );

    } finally {

      setLoading(false);

    }

  }
async function handleCommentSubmit() {

  if (!commentText.trim()) {
    return;
  }

  const text = commentText;

  const tempComment: Comment = {
    id: `temp-${Date.now()}`,
    blog_id: id!,
    author_id: "",
    username:
      localStorage.getItem(
        "username"
      ) || "You",
    content: text,
    created_at:
      new Date().toISOString(),
    parent_comment_id: null,
    replies: []
  };

  setComments(
    (prev) => [
      tempComment,
      ...prev
    ]
  );

  setCommentText("");

  try {

    await commentApi.post(
      "/comments/",
      {
        blog_id: id,
        content: text
      }
    );

    setTimeout(
      () => {
        fetchComments();
      },
      1000
    );

  } catch (error) {

    console.error(
      "Failed to create comment",
      error
    );

    fetchComments();

  }

}

  if (loading) {

    return (

      <div
        className="
          max-w-4xl
          mx-auto
          px-4
          py-6
        "
      >
        Loading...
      </div>

    );

  }

  if (!post) {

    return (

      <div
        className="
          max-w-4xl
          mx-auto
          px-4
          py-6
        "
      >
        Post not found
      </div>

    );

  }

  return (

    <div
      className="
        max-w-4xl
        mx-auto
        px-4
        py-6
      "
    >

      <article
        className="
          border-b
          border-border
          pb-8
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-4
          "
        >
          {post.title}
        </h1>

        <div
          className="
            flex
            items-center
            gap-3
            text-sm
            text-muted-foreground
            mb-6
          "
        >

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

        <div
          className="
            leading-7
            whitespace-pre-wrap
          "
        >
          {post.content}
        </div>

      </article>

      <section className="mt-10">

        <h2
          className="
            text-xl
            font-semibold
            mb-4
          "
        >
          Comments
        </h2>

        <div className="mb-6">

          <textarea
            value={commentText}
            onChange={(e) =>
              setCommentText(
                e.target.value
              )
            }
            placeholder="Share your thoughts..."
            rows={4}
            className="
              w-full
              border
              border-border
              rounded
              p-3
              bg-background
            "
          />

          <button
            onClick={
              handleCommentSubmit
            }
            className="
              mt-3
              px-4
              py-2
              bg-primary
              text-primary-foreground
              rounded
            "
          >
            Post Comment
          </button>

        </div>

        <div className="space-y-4">

          {comments.length === 0 && (

            <p
              className="
                text-muted-foreground
              "
            >
              No comments yet.
            </p>

          )}

          {comments.map(
            (comment) => (

              <CommentItem
                key={comment.id}
                comment={comment}
                refreshComments={
                  fetchComments
                }
              />

            )
          )}

        </div>

      </section>

    </div>

  );

}

export default PostDetails;