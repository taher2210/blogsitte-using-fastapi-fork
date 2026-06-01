import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogApi from "../api/blog";

export function CreatePost() {

  const navigate = useNavigate();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await blogApi.post(
          "/posts/",
          {
            title,
            content
          }
        );

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create post"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Create Post
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="w-full border rounded p-3"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          className="w-full border rounded p-3 h-48"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          {loading
            ? "Publishing..."
            : "Publish"}
        </button>

      </form>

    </div>
  );
}