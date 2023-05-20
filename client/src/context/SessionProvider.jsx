import { useContext, useState } from "react";
import {
  getAthleteSessionsRequest, getSessionRequest
} from "../api/trainer.api";
import { SessionContext } from "./SessionContext";

export const useSessions = () => {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error("useSessions must be used within a SessionContextProvider");

  return context;
};

export const SessionContextProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);

  async function loadSessions(id) {
    const response = await getAthleteSessionsRequest(id);
    setSessions(response.data);
  }

  async function getSession(id) {
    try {
      console.log("getSession",id);
      const response = await getSessionRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

    return (
    <SessionContext.Provider
      value={{
        sessions,
        loadSessions, 
        getSession
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};