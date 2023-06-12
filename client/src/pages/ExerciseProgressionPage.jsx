import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExerciseProgressionCard from "../components/ExerciseProgressionCard";
import ExerciseProgressionItem from "../components/ExerciseProgressionItem";
import { useExerciseProgression } from "../context/ExerciseProgressionProvider";
import { useAuth } from "../context/AuthProvider";
function ExerciseProgressionPage() {
  const { exercises, loadExerciseProgression } = useExerciseProgression();
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetch = async () => {
     const progressions = await loadExerciseProgression(params.idAthlete, params.id, user.token);
      };
    fetch();
  }, [user]);

  function renderMain() {
    if (exercises.length === 0) return <h1>No exercises yet</h1>;
    const keys = Object.keys(exercises);
    return (
      <div>
        {keys.map((date) => {
          return (
            <div  className="grid-cols-2 m-1 flex">
              <ExerciseProgressionCard date={date} />
              <div className="grid grid-cols-1 gap-1 ">
                {exercises[date].map((execution) => (
                  <ExerciseProgressionItem execution={execution} key={execution.id_execution} />
                ))}
              </div>
            </div>
          );
        })}
    
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-5xl text-white font-bold text-left"> Exercise Progression</h1>
      <div className="h-3 bg-red-800 w-full my-10 rounded-md"></div>
      <div className="text-white px-40 flex"> 
        <div className="w-1/4">Exercise</div>
        <div className="w-1/4">No. Set</div>
        <div className="w-1/4 ">No. Rep</div>
        <div className="w-1/4 px-0">Weight (Kg)</div>
        <div className="w-1/4 px-10">RPE/RIR</div>
   
      </div>
      <div className="grid grid-cols-1 gap-1.5 px-20">
         {renderMain()}
      </div> 
    </div>
  );
}

export default ExerciseProgressionPage;