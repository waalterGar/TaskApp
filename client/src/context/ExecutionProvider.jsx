import { useContext, useState } from "react";
import {
  getExecutionsRequest,
} from "../api/trainer.api";
import { ExecutionContext } from "./ExecutionContext";

export const useExecutions = () => {
  const context = useContext(ExecutionContext);
  if (!context)
    throw new Error("useTasks must be used within a ExecutionContextProvider");

  return context;
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
        loadExecutions
      }}
    >
      {children}
    </ExecutionContext.Provider>
  );
};
