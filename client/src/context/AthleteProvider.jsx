import { useContext, useState } from "react";
import {
  getAthletesRequests, getAthleteRequest
} from "../api/trainer.api";
import { AthleteContext } from "./AthleteContext";

export const useAthletes = () => {
  const context = useContext(AthleteContext);
  if (!context)
    throw new Error("useTasks must be used within a AthleteContextProvider");

  return context;
};

export const AthleteContextProvider = ({ children }) => {
  const [athletes, setAthletes] = useState([]);

  async function loadAthletes() {
    const response = await getAthletesRequests();
    setAthletes(response.data);
  }

  const getAthlete = async (id) => {
    try {
      const response = await getAthleteRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AthleteContext.Provider
      value={{
        athletes,
        loadAthletes,
        getAthlete
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
};
