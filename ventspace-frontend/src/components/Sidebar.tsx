import { Link, useLocation } from "react-router-dom";

export function Sidebar() {

  const location = useLocation();

  const handleLogout = () => {

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
  };

  return (
    <aside className="pt-1">

      <h2 className="text-xs font-semibold tracking-widest text-muted-foreground mb-6">
        VENTSPACE
      </h2>

      <nav>

        <ul className="space-y-3">

          <li>

            <Link
              to="/"
              className={`text-sm transition-colors ${
                location.pathname === "/"
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </Link>

          </li>

          <li>

            <Link
              to="/create-post"
              className={`text-sm transition-colors ${
                location.pathname === "/create-post"
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Create Post
            </Link>

          </li>

        </ul>

      </nav>

      <div className="mt-10">

        <button
          onClick={handleLogout}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Logout
        </button>

      </div>

    </aside>
  );
}