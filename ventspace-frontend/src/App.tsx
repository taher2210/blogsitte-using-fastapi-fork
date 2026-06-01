import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { Login } from "./components/Login";
import { Register } from "./components/Register";

import { RootLayout } from "./layouts/RootLayout";

import { Home } from "./pages/Home";
import { CreatePost } from "./pages/CreatePost";
import { PostDetails } from "./pages/PostDetails";
import { EditPost } from "./pages/EditPost";

function ProtectedRoute({
  children
}: {
  children: React.ReactNode;
}) {

  const token =
    localStorage.getItem("access_token");

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
    localStorage.getItem("access_token");

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