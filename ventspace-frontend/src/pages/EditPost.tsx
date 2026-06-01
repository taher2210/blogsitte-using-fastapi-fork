import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import blogApi from "../api/blog";

export function EditPost() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    fetchPost();

  }, []);

  async function fetchPost() {

    try {

      const response =
        await blogApi.get(
          `/posts/${id}`
        );

      setTitle(
        response.data.title
      );

      setContent(
        response.data.content
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setSaving(true);

    try {

      await blogApi.put(
        `/posts/${id}`,
        {
          title,
          content
        }
      );

      navigate(
        `/posts/${id}`
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update post"
      );

    } finally {

      setSaving(false);

    }
  }

  if (loading) {

    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        Loading...
      </div>
    );

  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">

      <h1 className="text-2xl font-bold mb-6">
        Edit Post
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="w-full border rounded p-3"
          placeholder="Title"
          required
        />

        <textarea
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          rows={10}
          className="w-full border rounded p-3"
          placeholder="Content"
          required
        />

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          {saving
            ? "Saving..."
            : "Update Post"}
        </button>

      </form>

    </div>
  );
}