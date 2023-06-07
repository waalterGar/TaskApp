import { useContext, useState } from "react";
import {
  getAthletesRequests, getAthleteRequest,
  addAthleteRequest, getAllAthletesRequest
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

  async function loadAthletes(id) {
    try {
    const response = await getAthletesRequests(id);
    setAthletes(response.data);
  } catch (error) {
    console.error(error);
  }
  }

  const getAthlete = async (id) => {
    try {
      const response = await getAthleteRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAthletes = async () => {
      const response = await getAllAthletesRequest();
      setAthletes(response.data);
  };

  const addAthlete = async (athleteId, idTrainer) => {
    try {
      const response = await addAthleteRequest(athleteId, idTrainer);
      setAthletes([...athletes, response.data]);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <AthleteContext.Provider
      value={{
        athletes,
        loadAthletes,
        getAthlete,
        addAthlete,
        getAllAthletes
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
};
