import { useExecutions } from "../context/ExecutionProvider";
import { useNavigate } from "react-router-dom";

function ExecutionCard({ exercise, exerciseId, params}) {
  const { deleteTask, toggleTask } = useExecutions();
  const navigate = useNavigate();
  console.log("execution", exercise);

  return (
    <div className=" text-white rounded-md p-2  inline-block">
       
      <div className="px-4 inline ">
        <h2 className="text-sm font-bold" onClick={() => navigate(`/athlete/${params.idAthlete}/progression/${exerciseId}`)} >{exercise}</h2>
      </div>     
    </div>
  );
}

export default ExecutionCard;