import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export function Navigation() {

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

          <div className="flex items-center gap-3 cursor-pointer">

            <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-sm font-semibold">
              T
            </div>

           

          </div>

        </div>

      </div>

    </nav>
  );
}