import { useContext, useState } from "react";
import {
  getTrainerAthletesRequests, getAthleteRequest,
  addTrainerAthleteRequest, getAllAthletesRequest
} from "../api/trainer.api";
import { AthleteContext } from "./AthleteContext";

import {addDietitianAthleteRequest, getDietitianAthletesRequest} from "../api/dietitian.api";

export const useAthletes = () => {
  const context = useContext(AthleteContext);
  if (!context)
    throw new Error("useTasks must be used within a AthleteContextProvider");

  return context;
};

export const AthleteContextProvider = ({ children }) => {
  const [athletes, setAthletes] = useState([]);

  async function loadAthletes(id,role, token) {
    console.log("loadAthletes", id, token);
    try {
      let response;
    if (role === "trainer") {
      response = await getTrainerAthletesRequests(id, token);
    }
    if (role === "dietitian") {
      response = await getDietitianAthletesRequest(id, token);
    }
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

  const addAthlete = async (athleteId, id, role, token) => {
    console.log("addbbbAthlete", athleteId, id, token);
    try {
      let response;
    if (role === "trainer") {
      console.log("TRAINER")
      response = await addTrainerAthleteRequest(athleteId, id, token);
    }
    if (role === "dietitian") {
      console.log("DIEETITIAN")
      response= await addDietitianAthleteRequest(athleteId, id, token);
    }
      console.log("addAthlete", response.data);
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
