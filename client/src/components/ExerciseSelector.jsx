import { useEffect, useState } from "react";

function ExerciseSelector({exercises, onSelectExercise}) {
  const [selectedExercise, setSelectedExercise] = useState('');
  console.log("ExerciseSelector", exercises);
  
  const handleExerciseChange = (event) => {
    const exerciseId = event.target.value;
    setSelectedExercise(exerciseId);
    onSelectExercise(exerciseId);
  };

  return (
    <select className="block w-full p-2 border border-gray-300 bg-slate-600 rounded-md shadow-sm focus:outline-none focus:border-blue-500" /*handle change*/ value={selectedExercise}
    onChange={handleExerciseChange}>
      {exercises.map((exercise) => (
        <option key={exercise.id_exercise} value={exercise.id_exercise}>
          {exercise.name}
        </option>
      ))}
    </select>
  );
}

export default ExerciseSelector;
