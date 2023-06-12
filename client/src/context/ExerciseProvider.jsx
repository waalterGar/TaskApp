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

  async function loadExercises(id, token) {
    console.log("loadExercises",id);
    const response = await getExercisesRequest(id, token);
    console.log("loadExercises",response);
    setExercises(response.data);
  }

  async function getExercise(id, token) {
    try {
      console.log("getExercise",id);
      const response = await getExerciseRequest(id, token);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  const updateExercise = async (id, exercise, token) => {
    try {
      const response = await updateExerciseRequest(id, exercise, token);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const createExercise = async (exercise, idTrainer, token) => {
    try {
      exercise.trainer_id = idTrainer;
      const response = await createExerciseRequest(exercise, token);
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
