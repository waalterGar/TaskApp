import { useEffect, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import { useExercises } from "../context/ExerciseProvider";

function AthletesPage() {
  const { exercises, loadExercises } = useExercises();

  useEffect(() => {
    loadExercises()
  }, []);

  function renderMain() {
    if (exercises.length === 0) return <h1>No exercises yet</h1>;
    console.log(exercises);
    return exercises.map((exercise) => <ExerciseCard exercise={exercise} key={exercise.id_exercise} />);
  }

  return (
    <div>
      <div className="">
        <h1 className="text-5xl text-white font-bold text-left inline"> My exercises</h1>
        <div className="bg-red-800 text-white font-bold inline p-2 rounded-md float-right ">Add Exercise</div>
        </div>
        <div className="h-3 bg-red-800 w-full my-10 rounded-md"></div>
      <div className="text-white px-40 flex"> 
        <div className="w-1/3">Name</div>
        <div className="w-1/3">Muscle Group</div>
        <div className="w-1/4 ">Description</div>
      </div>
      <div className="grid grid-cols-1 gap-1.5 px-20">
         {renderMain()}
      </div> 
    </div>
  );
}

export default AthletesPage;