import { useExerciseProgression } from "../context/ExerciseProgressionProvider";
import { useNavigate } from "react-router-dom";

function ExerciseProgressionCard({date}) {
  const {} = useExerciseProgression();
  const navigate = useNavigate();

  return (
    <div className=" text-white rounded-md p-2  inline-block">
      <div className="px-4 inline ">
        <h2 className="text-sm font-bold">{date}</h2>
      </div>     
    </div>
  );
}

export default ExerciseProgressionCard;