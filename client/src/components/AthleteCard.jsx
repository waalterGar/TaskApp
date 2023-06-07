import { useAthletes } from "../context/AthleteProvider";
import { useNavigate } from "react-router-dom";

function AthleteCard({ athlete, trainerId }) {
  const { deleteTask, toggleTask } = useAthletes();
  const navigate = useNavigate();
  const handleDone = async () => {
    await toggleTask(task.id);
  };

  return (
    <div className="bg-zinc-700 text-white rounded-md p-4 flex">
       
    <div className="w-1/4 px-4">
        <h2 className="text-sm font-bold">{athlete.id}</h2>
        <h2 className="text-sm font-bold">{athlete.name}</h2>
    </div>
    <div className="w-1/4 ">
        <h2 className="text-sm font-bold">{athlete.phone_num}</h2>
        <h2 className="text-sm font-bold">{athlete.email}</h2>
    </div>
    <div className="w-1/4  flex justify-center items-center px-4"  onClick={() => navigate(`/trainers/${trainerId}/routines/${athlete.id_routine}/athlete/${athlete.id}/sessions/`)}>
    {renderRoutine(athlete.routine_name)}
    </div>
    <div className="w-1/4  flex justify-center items-center px-4">
        <h2 className="text-sm font-bold cursor-pointer" onClick={() => navigate(`/mealPlan/${athlete.id}`)}>{athlete.nutritional_plan_name}</h2>
    </div>      
</div>
  );
}
function renderRoutine(routineName){
  if(routineName == null){
    return(
      <h2 className="text-sm font-bold">No Routine</h2>
    )
  }
  return(
      <h2 className="text-sm font-bold cursor-pointer">{routineName}</h2>  
    )
}


export default AthleteCard;