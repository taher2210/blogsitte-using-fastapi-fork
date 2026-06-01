import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import authApi from "../api/auth";
import logo from "../assets/logo.png";

export function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setLoading(true);

    setErrorMessage("");

    setSuccessMessage("");

    try {

      const response = await authApi.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access_token
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh_token
      );

      setSuccessMessage(
        "Login successful. Redirecting..."
      );

      console.log(
        "Login successful"
      );

      console.log(
        response.data
      );

      setTimeout(() => {

        navigate("/", {
          replace: true
        });

      }, 1000);

    } catch (error: any) {

      console.error(
        "Login failed:",
        error
      );

      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Invalid email or password";

      setErrorMessage(
        message
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        <div className="text-center mb-10">

          <div className="flex justify-center mb-6">

            <img
              src={logo}
              alt="VentSpace"
              className="w-full max-w-[300px] h-auto select-none"
            />

          </div>

          <h1 className="text-2xl font-bold mb-2">
            Welcome Back
          </h1>

          <p className="text-muted-foreground">
            Share thoughts, discover ideas,
            and join the conversation.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1.5"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full h-11 px-3 border border-border rounded bg-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
              placeholder="you@example.com"
              required
            />

          </div>

          <div>

            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1.5"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full h-11 px-3 border border-border rounded bg-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
              placeholder="••••••••"
              required
            />

          </div>

          {errorMessage && (

            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">

              {errorMessage}

            </div>

          )}

          {successMessage && (

            <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">

              {successMessage}

            </div>

          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-primary text-primary-foreground rounded font-medium transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >

            {loading
              ? "Signing In..."
              : "Sign In"}

          </button>

        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>

        </p>

      </div>

    </div>
  );
}