import axios from "axios";

export const getAthletesRequests = async (id) =>
  await axios.get(`http://localhost:4000/trainers/${id}/athletes`)

export const getSessionsRequest = async () =>
await axios.get("http://localhost:4000/athletes/4/sessions")

export const getSessionRequest = async (id) => 
await axios.get(`http://localhost:4000/sessions/${id}`)

export const getAthletesRequest = async () => 
await axios.get(`http://localhost:4000/athletes/`)

export const getAthleteRequest = async (id) => 
await axios.get(`http://localhost:4000/athletes/${id}`)

export const getAthleteSessionsRequest = async (id) =>
await axios.get(`http://localhost:4000/athletes/${id}/sessions`);

export const getExecutionsRequest = async () =>
await axios.get("http://localhost:4000/sessions/2/executions")

export const getExerciseProgressionRequest = async (idAthlete, id) =>
await axios.get(`http://localhost:4000/athletes/${idAthlete}/exercises/${id}/progression`)

export const getExercisesRequest = async (id) =>
await axios.get(`http://localhost:4000/trainers/${id}/exercises`)

export const getAthleteMealPlansRequest = async (id) =>
await axios.get(`http://localhost:4000/athletes/${id}/mealRecords`)

export const createSessionRequest = async (session) =>
await axios.post(`http://localhost:4000/sessions`, session)

export const updateSessionRequest = async (id, session) =>
  await axios.put(`http://localhost:4000/sessions/${id}`, session);

export const deleteSessionRequest = async (id) =>
  await axios.delete(`http://localhost:4000/sessions/${id}`);