import { useContext, useState } from "react";
import {getExercisesRequest, getExerciseRequest, updateExerciseRequest, createExerciseRequest} from "../api/trainer.api";
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
    console.log("loadExercises",id);
    const response = await getExercisesRequest(id);
    console.log("loadExercises",response);
    setExercises(response.data);
  }

  async function getExercise(id) {
    try {
      console.log("getExercise",id);
      const response = await getExerciseRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  const updateExercise = async (id, exercise) => {
    try {
      const response = await updateExerciseRequest(id, exercise);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const createExercise = async (exercise, idTrainer) => {
    try {
      exercise.trainer_id = idTrainer;
      const response = await createExerciseRequest(exercise);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        loadExercises,
        getExercise,
        createExercise,
        updateExercise
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};
