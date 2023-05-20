import { useExecutions } from "../context/ExecutionProvider";
import { useNavigate } from "react-router-dom";

function ExecutionCard({ execution, params}) {
  const { deleteTask, toggleTask } = useExecutions();
  const navigate = useNavigate();
  console.log("params",params);

  return (
    <div className=" text-white rounded-md p-2  inline-block">
       
      <div className="px-4 inline ">
        <h2 className="text-sm font-bold" onClick={() => navigate(`/athlete/${params.idAthlete}/progression/${params.id}`)} >{execution}</h2>
      </div>     
    </div>
  );
}

export default ExecutionCard;