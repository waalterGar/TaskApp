import { useExercises } from "../context/ExerciseProvider";
import { useNavigate } from "react-router-dom";

function ExerciseCard({ exercise }) {
  const {} = useExercises();
  const navigate = useNavigate();
 
  return (
    <div className="bg-zinc-700 text-white rounded-md p-4 flex">
       
    <div className="w-1/3 px-4">
        <h2 className="text-sm font-bold">{exercise.name}</h2>
    </div>
    <div className="w-1/3">
        <h2 className="text-sm font-bold">{exercise.muscle_group}</h2> 
    </div>
    <div className="w-1/3  flex justify-center items-center px-4">
        <h2 className="text-sm font-bold">{exercise.description}</h2>
    </div>
</div>
  );
}
export default ExerciseCard;