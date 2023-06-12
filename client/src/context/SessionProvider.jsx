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

  async function loadSessions(id, token) {
    const response = await getAthleteSessionsRequest(id, token);
    setSessions(response.data);
  }

  async function getSession(id, token) {
    try {
      console.log("getSession",id);
      const response = await getSessionRequest(id, token);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const updateSession = async (id, session, token) => {
    try {
      const response = await updateSessionRequest(id, session, token);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const createSession = async (session, idRoutine, token) => {
    try {
      session.routine_id = idRoutine;
      const response = await createSessionRequest(session, token);
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