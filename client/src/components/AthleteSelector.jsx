import { useEffect, useState } from "react";

function AthleteSelector({athletes, onSelectAthlete}) {
  const [selectedExercise, setSelectedExercise] = useState('');
  console.log("SELECTOR athletes", athletes);
  
  const handleAthleteChange = (event) => {
    const athleteId = event.target.value;
    setSelectedExercise(athleteId);
    onSelectAthlete(athleteId);
  };

  return (
    <select className="block w-full p-2 border border-gray-300 bg-slate-600 rounded-md shadow-sm focus:outline-none focus:border-blue-500" /*handle change*/ value={selectedExercise}
    onChange={handleAthleteChange}>
      {
        athletes.map((athlete) => (
          <option key={athlete.id} value={athlete.id}>
            {athlete.email}
          </option>
       ))}
    </select>
  );
}

export default AthleteSelector;
