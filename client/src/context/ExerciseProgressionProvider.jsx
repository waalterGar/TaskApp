import { useContext, useState } from "react";
import {getExerciseProgressionRequest} from "../api/trainer.api";
import { ExerciseProgressionContext } from "./ExerciseProgressionContext";

export const useExerciseProgression = () => {
  const context = useContext(ExerciseProgressionContext);
  if (!context)
    throw new Error("useExercises must be used within a ExecutionContextProvider");

  return context;
};

export const ExerciseProgressionContextProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);

  async function loadExerciseProgression(idAthlete,id, token) {
    const response = await getExerciseProgressionRequest(idAthlete,id, token);
    setExercises(response.data);
  }

  return (
    <ExerciseProgressionContext.Provider
      value={{
        exercises,
        loadExerciseProgression
      }}
    >
      {children}
    </ExerciseProgressionContext.Provider>
  );
};
