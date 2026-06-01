import { useEffect, useState } from "react";

import blogApi from "../api/blog";
import userApi from "../api/user";

import { Sidebar } from "../components/Sidebar";
import { PostCard } from "../components/PostCard";

interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  username: string;
  created_at: string;
}

export function Home() {

  const [posts, setPosts] =
    useState<Post[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [currentUserId, setCurrentUserId] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const POSTS_PER_PAGE = 5;

  useEffect(() => {

    fetchCurrentUser();
    fetchPosts();

  }, []);

  async function fetchCurrentUser() {

    try {

      const response =
        await userApi.get("/auth/me");

      setCurrentUserId(
        response.data.uuid
      );

    } catch (error) {

      console.error(
        "Failed to fetch user",
        error
      );

    }
  }

  async function fetchPosts() {

    try {

      const response =
        await blogApi.get("/posts/");

      const sortedPosts =
        response.data.sort(
          (a: Post, b: Post) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );

      setPosts(sortedPosts);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  const totalPages = Math.ceil(
    posts.length / POSTS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * POSTS_PER_PAGE;

  const currentPosts =
    posts.slice(
      startIndex,
      startIndex + POSTS_PER_PAGE
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      <div className="grid lg:grid-cols-[120px_1fr] gap-10">

        <Sidebar />

        <main>

          <div className="mb-6">

            <h1 className="text-2xl font-bold">
              Recent Discussions
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              {posts.length} posts
            </p>

          </div>

          {loading && (
            <p className="text-muted-foreground">
              Loading discussions...
            </p>
          )}

          <div>

            {currentPosts.map((post) => (

              <PostCard
                key={post.id}
                post={post}
                currentUserId={currentUserId}
              />

            ))}

          </div>

          {!loading && totalPages > 1 && (

            <div className="flex items-center gap-2 mt-8">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, i) => (

                  <button
                    key={i + 1}
                    onClick={() =>
                      setCurrentPage(i + 1)
                    }
                    className={`px-3 py-1 border rounded ${
                      currentPage === i + 1
                        ? "font-semibold"
                        : ""
                    }`}
                  >
                    {i + 1}
                  </button>

                )
              )}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>

            </div>

          )}

        </main>

      </div>

    </div>
  );
}