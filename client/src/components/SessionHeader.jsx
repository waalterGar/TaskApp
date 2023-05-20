import { useExecutions } from "../context/ExecutionProvider";
import { useNavigate } from "react-router-dom";

function SessionHeader({ session }) {
  const {} = useExecutions();
  const navigate = useNavigate();
 
  return (
    <div className="bg-zinc-700 text-white rounded-md p-4 flex cursor-pointer" onClick={() => navigate(`/sessions/${athlete.id}`)}>
       
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">Session Name: {session.name}</h2>
    </div>
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">Date: {session.session_date}</h2>
    </div>
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">Description: {session.description}</h2>
       
    </div>
    <div className="w-1/4  flex justify-center items-center px-4">
        <h2 className="text-sm ">Trainer Notes: {session.trainer_notes}</h2>  
    </div> 
</div>
  );
}

export default SessionHeader;