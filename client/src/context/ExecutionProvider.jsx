import { useContext, useState } from "react";
import {
  getExecutionsRequest, getExecutionRequest, updateExecutionRequest,
   createExecutionRequest, getExercisesRequest
} from "../api/trainer.api";
import { ExecutionContext } from "./ExecutionContext";

export const useExecutions = () => {
  const context = useContext(ExecutionContext);
  if (!context)
    throw new Error("useTasks must be used within a ExecutionContextProvider");

  return context;
};

async function getExercises(id) {
  console.log("getExercises",id);
  try {
    const response = await getExercisesRequest(id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getExecution(id) {
  try {
    console.log("getExecution",id);
    const response = await getExecutionRequest(id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
const updateExecution = async (id, exercise) => {
  try {
    const response = await updateExecutionRequest(id, exercise);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const createExecution = async (execution) => {
  try {

    //copy execution to avoid mutating the original object
    execution = Object.assign({}, execution);
    execution.num_set = parseInt(execution.num_set);
    execution.repetitions = parseInt(execution.repetitions);
    execution.weight = parseInt(execution.weight);
    execution.rpe = parseInt(execution.rpe);
    execution.rir = parseInt(execution.rir);
    execution.exercise_id = parseInt(execution.exercise_id);
    execution.training_session_id = parseInt(execution.training_session_id);

    console.log("parsed", execution);
    const response = await createExecutionRequest(execution);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const ExecutionContextProvider = ({ children }) => {
  const [executions, setExecutions] = useState([]);

  async function loadExecutions() {
    const response = await getExecutionsRequest();
    setExecutions(response.data);
  }

  return (
    <ExecutionContext.Provider
      value={{
        executions,
        loadExecutions,
        getExecution,
        createExecution,
        updateExecution,
        getExercises
      }}
    >
      {children}
    </ExecutionContext.Provider>
  );
};
