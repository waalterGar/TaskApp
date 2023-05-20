import { useAthletes } from "../context/AthleteProvider";
import { useNavigate } from "react-router-dom";

function AthleteHeader({ athlete }) {
  const {} = useAthletes();
  const navigate = useNavigate();
 
  return (
    <div className="bg-zinc-700 text-white rounded-md p-4 flex">
       
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">Name: {athlete.name}</h2>
    </div>
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">📧 {athlete.email}</h2>
    </div>
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">📱 {athlete.phone_num}</h2> 
    </div>
    <div className="w-1/4  flex justify-center items-center px-4">
        <h2 className="text-sm ">Gender: {athlete.gender}</h2>  
    </div> 
    <div className="w-1/4  flex justify-center items-center px-4">
        <h2 className="text-sm ">Height: {athlete.height} cm</h2>  
    </div> 
    <div className="w-1/4  flex justify-center items-center px-4">
        <h2 className="text-sm ">Weight: {athlete.weight} kg</h2>  
    </div> 
</div>
  );
}

export default AthleteHeader;