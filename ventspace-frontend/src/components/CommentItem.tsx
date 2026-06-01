// src/components/CommentItem.tsx

import { useState, useEffect } from "react";

import authApi from "../api/auth";
import commentApi from "../api/comment";

export interface Comment {
  id: string;
  blog_id: string;
  author_id: string;
  username: string;
  content: string;
  created_at: string;
  parent_comment_id: string | null;
  replies: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  refreshComments: () => void;
}

export function CommentItem({
  comment,
  refreshComments
}: CommentItemProps) {

  const [currentUserId, setCurrentUserId] =
    useState("");

  const [replying, setReplying] =
    useState(false);

  const [replyText, setReplyText] =
    useState("");

  const [editing, setEditing] =
    useState(false);
const [editText, setEditText] =
  useState("");

useEffect(() => {

  setEditText(
    comment.content
  );

}, [comment.content]);

  const [likes, setLikes] =
    useState(0);

  const [dislikes, setDislikes] =
    useState(0);

  useEffect(() => {

    fetchCurrentUser();

    fetchReactions();

  }, []);

async function fetchCurrentUser() {

  try {

    const response =
      await authApi.get(
        "/auth/me"
      );

    console.log(
      "Current User:",
      response.data
    );

    setCurrentUserId(
      response.data.uuid
    );

  } catch (error) {

    console.error(
      "Failed to fetch current user",
      error
    );

  }

}

  async function fetchReactions() {

    try {

      const response =
        await commentApi.get(
          `/comments/${comment.id}/reactions`
        );

      setLikes(
        response.data.likes
      );

      setDislikes(
        response.data.dislikes
      );

    } catch (error) {

      console.error(error);

    }

  }

  async function handleReply() {

    if (!replyText.trim()) {
      return;
    }

    try {

      await commentApi.post(
        "/comments/reply",
        {
          blog_id: comment.blog_id,
          parent_comment_id:
            comment.id,
          content: replyText
        }
      );

      setReplyText("");

      setReplying(false);

      refreshComments();

    } catch (error) {

      console.error(error);

    }

  }

  async function handleEdit() {

    if (!editText.trim()) {
      return;
    }

    try {

      await commentApi.put(
        `/comments/${comment.id}`,
        {
          content: editText
        }
      );

      setEditing(false);

      refreshComments();

    } catch (error) {

      console.error(error);

    }

  }

  async function handleDelete() {

    if (
      !window.confirm(
        "Delete this comment?"
      )
    ) {
      return;
    }

    try {

      await commentApi.delete(
        `/comments/${comment.id}`
      );

      refreshComments();

    } catch (error) {

      console.error(error);

    }

  }

  async function handleReaction(
    reaction: "LIKE" | "DISLIKE"
  ) {

    try {

      await commentApi.post(
        `/comments/${comment.id}/reaction`,
        {
          reaction
        }
      );

      fetchReactions();

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div
      className="
        border
        border-border
        rounded
        p-4
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
          mb-3
        "
      >

        <div
          className="
            w-10
            h-10
            rounded-full
            bg-primary
            text-primary-foreground
            flex
            items-center
            justify-center
            font-semibold
            shrink-0
          "
        >
          {comment.username
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>

          <div className="font-medium">
            @{comment.username}
          </div>

          <div
            className="
              text-xs
              text-muted-foreground
            "
          >
            {new Date(
              comment.created_at
            ).toLocaleString()}
          </div>

        </div>

      </div>

      {editing ? (

        <div>

          <textarea
            value={editText}
            onChange={(e) =>
              setEditText(
                e.target.value
              )
            }
            rows={3}
            className="
              w-full
              border
              border-border
              rounded
              p-2
            "
          />

          <div
            className="
              flex
              gap-2
              mt-2
            "
          >

            <button
              onClick={
                handleEdit
              }
              className="
                px-3
                py-1
                bg-primary
                text-primary-foreground
                rounded
              "
            >
              Save
            </button>

            <button
              onClick={() =>
                setEditing(false)
              }
              className="
                px-3
                py-1
                border
                rounded
              "
            >
              Cancel
            </button>

          </div>

        </div>

      ) : (

        <p
          className="
            whitespace-pre-wrap
          "
        >
          {comment.content}
        </p>

      )}

      <div
        className="
          flex
          gap-4
          mt-4
          text-sm
        "
      >

        <button
          onClick={() =>
            handleReaction(
              "LIKE"
            )
          }
        >
          👍 {likes}
        </button>

        <button
          onClick={() =>
            handleReaction(
              "DISLIKE"
            )
          }
        >
          👎 {dislikes}
        </button>

        <button
          onClick={() =>
            setReplying(
              !replying
            )
          }
        >
          Reply
        </button>

        {String(comment.author_id) ===
  String(currentUserId) && (

          <>

            <button
              onClick={() =>
                setEditing(true)
              }
            >
              Edit
            </button>

            <button
              onClick={
                handleDelete
              }
            >
              Delete
            </button>

          </>

        )}

      </div>

      {replying && (

        <div className="mt-4">

          <textarea
            value={replyText}
            onChange={(e) =>
              setReplyText(
                e.target.value
              )
            }
            rows={3}
            placeholder="Write a reply..."
            className="
              w-full
              border
              border-border
              rounded
              p-2
            "
          />

          <button
            onClick={
              handleReply
            }
            className="
              mt-2
              px-3
              py-1
              bg-primary
              text-primary-foreground
              rounded
            "
          >
            Reply
          </button>

        </div>

      )}

      {comment.replies.length > 0 && (

        <div
          className="
            ml-6
            mt-4
            pl-4
            border-l
            border-border
            space-y-3
          "
        >

          {comment.replies.map(
            (reply) => (

              <CommentItem
                key={reply.id}
                comment={reply}
                refreshComments={
                  refreshComments
                }
              />

            )
          )}

        </div>

      )}

    </div>

  );

}