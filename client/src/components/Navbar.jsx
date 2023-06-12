import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, dispatch } = useAuth();

  console.log("location:", location);
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  return (
    <div className="bg-black flex justify-between px-20 py-4">
      <Link to="/trainers/6/athletes" className="text-white font-bold">
        <h1>FitFuel</h1>
      </Link>

      <ul className="flex gap-x-1">
        {user && (
          <li className="flex">
            <span className="text-white">{user.email}</span>
            <Button
              className="px-5 py-1 text-white w-full"
              onClick={() => {
                localStorage.removeItem("user");
                dispatch({ type: "LOGOUT" });
                navigate(`/login`);
              }}
            >
              Log out
            </Button>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/login">
              <Button className="px-5 py-1 text-white w-full">Log in</Button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
