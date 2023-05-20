import { useExerciseProgression } from "../context/ExerciseProgressionProvider";
import { useNavigate } from "react-router-dom";

function ExerciseProgressionItem({ execution }) {
    const {} = useExerciseProgression();
    const navigate = useNavigate();
    return (
      <div className="bg-zinc-700 text-white rounded-md p-4 flex">
        <div className="w-1/4  flex justify-center items-center px-4">
          <h2 className="text-sm font-bold">{execution.num_set}</h2>
        </div>
        <div className="w-1/4  flex justify-center items-center px-4">
          <h2 className="text-sm font-bold">{execution.repetitions}</h2>
        </div>
        <div className="w-1/4  flex justify-center items-center px-4">
          <h2 className="text-sm font-bold">{execution.weight}</h2>
        </div>
        <div className="w-1/4 flex justify-center items-center px-4">
          <h2 className="text-sm font-bold">{execution.rpe}</h2>
        </div> 
      </div>
    );
  }

export default ExerciseProgressionItem;