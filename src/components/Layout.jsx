import { Link, Outlet } from "react-router";
import { useUserContext } from "../hooks/contextHooks";

const Layout = () => {
  const { user, handleLogout } = useUserContext();
  return (
    <div>
      <nav className="w-full bg-blue-800 p-4 leading-12 text-white">
        <ul className="flex justify-around">
          <li>
            <Link className="rounded-2xl bg-blue-200 p-4 text-gray-900" to="/">
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  className="rounded-2xl bg-blue-200 p-4 text-gray-900"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className="rounded-2xl bg-blue-200 p-4 text-gray-900"
                  to="/upload"
                >
                  Upload
                </Link>
              </li>
              <li>
                <Link
                  className="rounded-2xl bg-blue-200 p-4 text-gray-900"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                className="rounded-2xl bg-blue-200 p-4 text-gray-900"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
