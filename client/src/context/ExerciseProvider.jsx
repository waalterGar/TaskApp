import { useContext, useState } from "react";
import {getExercisesRequest} from "../api/trainer.api";
import { ExerciseContext } from "./ExerciseContext";

export const useExercises = () => {
  const context = useContext(ExerciseContext);
  if (!context)
    throw new Error("useExercises must be used within a ExerciseContextProvider");

  return context;
};

export const ExerciseContextProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);

  async function loadExercises(id) {
    const response = await getExercisesRequest(id);
    setExercises(response.data);
  }

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        loadExercises
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};
