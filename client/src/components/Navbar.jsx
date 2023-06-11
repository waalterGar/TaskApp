import { Link} from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('location:', location);
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  return (
    <div className="bg-black flex justify-between px-20 py-4">
      <Link to="/trainers/6/athletes" className="text-white font-bold"> 
        <h1>FitFuel</h1>
      </Link>

      <ul className="flex gap-x-1">
        <li>
          <Button className="px-5 py-1 text-white w-full" onClick={() => {
                  localStorage.clear()
                    navigate(`/login`);
                }}>Log out</Button>
        </li>
        
      </ul>
    </div>
  ); 
}

export default Navbar;
