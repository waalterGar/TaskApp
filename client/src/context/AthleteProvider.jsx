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

  async function loadAthletes(id, token) {
    console.log("loadAthletes", id, token);
    try {
    const response = await getAthletesRequests(id, token);
    setAthletes(response.data);
  } catch (error) {
    console.error(error);
  }
  }

  const getAthlete = async (id, token) => {
    try {
      const response = await getAthleteRequest(id, token);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAthletes = async (token) => {
      const response = await getAllAthletesRequest(token);
      setAthletes(response.data);
  };

  const addAthlete = async (athleteId, idTrainer, token) => {
    try {
      const response = await addAthleteRequest(athleteId, idTrainer, token);
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
