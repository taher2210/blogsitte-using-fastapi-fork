import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../assets/logo.png";
import authApi from "../api/auth";

export function Navigation() {

  const [username, setUsername] =
    useState("");

  useEffect(() => {

    fetchUser();

  }, []);

  async function fetchUser() {

    try {

      const response =
        await authApi.get(
          "/auth/me"
        );

      setUsername(
        response.data.username
      );

    } catch (error) {

      console.error(
        "Failed to fetch user",
        error
      );

    }

  }

  return (

    <nav className="border-b border-border bg-background">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <Link to="/">
            <img
              src={logo}
              alt="VentSpace"
              className="h-[80px] w-auto"
            />
          </Link>

        </div>

        <div className="flex items-center gap-6">

          <Link
            to="/create-post"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Create Post
          </Link>

          <div className="flex items-center gap-3">

            <div
              className="
                w-9
                h-9
                rounded-full
                border
                border-border
                flex
                items-center
                justify-center
                text-sm
                font-semibold
              "
            >
              {username
                ? username
                    .charAt(0)
                    .toUpperCase()
                : "?"}
            </div>

            <span
              className="
                text-sm
                font-medium
              "
            >
              {username}
            </span>

          </div>

        </div>

      </div>

    </nav>

  );

}