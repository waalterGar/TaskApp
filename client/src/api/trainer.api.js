import axios from "axios";

export const getAthletesRequests = async () =>
  await axios.get("http://localhost:4000/trainers/6/athletes")

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

export const getExercisesRequest = async () =>
await axios.get("http://localhost:4000/trainers/4/exercises")

export const getAthleteMealPlansRequest = async (id) =>
await axios.get(`http://localhost:4000/athletes/${id}/mealRecords`)