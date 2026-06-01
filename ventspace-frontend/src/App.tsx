import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import { Login } from "./components/Login";
import { Register } from "./components/Register";

import { RootLayout } from "./layouts/RootLayout";

import { Home } from "./pages/Home";
import { CreatePost } from "./pages/CreatePost";
import { PostDetails } from "./pages/PostDetails";
import { EditPost } from "./pages/EditPost";

import authApi from "./api/auth";
import blogApi from "./api/blog";

function ProtectedRoute({
  children
}: {
  children: React.ReactNode;
}) {

  const token =
    localStorage.getItem(
      "access_token"
    );

  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  return <>{children}</>;

}

function PublicRoute({
  children
}: {
  children: React.ReactNode;
}) {

  const token =
    localStorage.getItem(
      "access_token"
    );

  if (token) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }

  return <>{children}</>;

}

function App() {

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const warmUpServices =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "access_token"
            );

          const requests = [

            blogApi.get(
              "/posts"
            )

          ];

          if (token) {

            requests.push(
              authApi.get(
                "/auth/me"
              )
            );

          }

          await Promise.allSettled(
            requests
          );

        } catch (error) {

          console.error(
            "Warmup failed:",
            error
          );

        } finally {

          setLoading(false);

        }

      };

    warmUpServices();

    const interval =
      setInterval(
        warmUpServices,
        10 * 60 * 1000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          bg-black
          text-white
          px-6
          text-center
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-4
          "
        >
          Starting Services...
        </h1>

        <p
          className="
            text-gray-300
            max-w-lg
          "
        >
          This project runs on free-tier
          microservices. If the services
          are asleep, the first visit may
          take up to a minute while they
          wake up.
        </p>

      </div>

    );

  }

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<Home />}
          />

          <Route
            path="create-post"
            element={<CreatePost />}
          />

          <Route
            path="posts/:id"
            element={<PostDetails />}
          />

          <Route
            path="posts/:id/edit"
            element={<EditPost />}
          />

        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;