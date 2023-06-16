import { useAuth } from "../context/AuthProvider";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log("user", user);


  if (!user) return <h1>loading...</h1>;
  if(user.role === "dietitian") 
    return (
    <div className="text-white">
      {user && (<h1 className="text-white"> WELCOME {user.name.toUpperCase()}!</h1>)}
      <Button
      variant="contained"
              color="secondary"
              onClick={() => navigate(`/athletes`)} > Atheletes
      </Button>

      <Button
      variant="contained"
              color="primary"
              onClick={() => navigate(`/meals`)} > My meals
      </Button>

    </div>
  );

  if(user.role === "trainer"){
    return(
      <div>
      <Button
      variant="contained"
              color="secondary"
              onClick={() => navigate(`/athletes`)} > Atheletes
      </Button>
      <Button
      variant="contained"
              color="secondary"
              onClick={() => navigate(`/trainers/${user.id}/exercises`)} > My  exercises
      </Button> 
</div>
    )
  }
}

export default Dashboard;
