import { useState } from "react";
import { Link } from "react-router-dom";
import authApi from "../api/auth";
import logo from "../assets/logo.png";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await authApi.post(
        "/auth/signup",
        {
          username,
          email,
          password,
        }
      );

      console.log(
        "Registration success:",
        response.data
      );

      setSuccessMessage(
        "Account created successfully."
      );

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error
      );

      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Registration failed";

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <img
            src={logo}
            alt="VentSpace"
            className="mx-auto w-full max-w-[300px] h-auto select-none mb-4"
          />

          <h1 className="text-2xl font-bold mb-2">
            Create Account
          </h1>

          <p className="text-gray-500">
            Join VentSpace today.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>
            <label className="block text-sm font-medium mb-1">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="username"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="••••••••"
              className="w-full border rounded px-3 py-2"
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
            className="
              w-full
              bg-black
              text-white
              rounded
              py-2
              transition-all
              duration-200
              hover:bg-gray-800
              hover:scale-[1.01]
              active:scale-[0.99]
              cursor-pointer
              disabled:bg-gray-400
              disabled:cursor-not-allowed
              disabled:hover:scale-100
            "
          >
            {loading
              ? "Signing Up..."
              : "Sign Up"}
          </button>

        </form>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium underline hover:text-gray-700"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}