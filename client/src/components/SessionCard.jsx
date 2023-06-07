import { useSessions } from "../context/SessionProvider";
import { useNavigate } from "react-router-dom";

function SessionCard({ session, athlete, trainerId}) {
  const { deleteTask, toggleTask } = useSessions();
  const navigate = useNavigate();
    console.log("session card: ",session);
  return (
    <div className="bg-zinc-700 text-white rounded-md p-4 flex cursor-pointer" onClick={() => navigate(`/trainers/${trainerId}/athlete/${athlete.id}/sessions/${session.id_training_session}/executions/`)}>
       
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">{session.name}</h2>
    </div>
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">{session.session_date}</h2>
    </div>
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">{session.description}</h2>    
    </div>
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">{session.description}</h2>    
    </div>
</div>

  );
}

export default SessionCard;