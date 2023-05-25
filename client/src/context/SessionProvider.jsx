import { useContext, useState } from "react";
import {
  getAthleteSessionsRequest, getSessionRequest, 
  createSessionRequest, updateSessionRequest
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

  const updateSession = async (id, session) => {
    try {
      const response = await updateSessionRequest(id, session);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const createSession = async (session, idRoutine) => {
    try {
      session.routine_id = idRoutine;
      const response = await createSessionRequest(session);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

    return (
    <SessionContext.Provider
      value={{
        sessions,
        loadSessions, 
        getSession,
        createSession, 
        updateSession
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};