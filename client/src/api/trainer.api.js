import axios from "axios";

//-------------------GET-------------------//

export const getAthletesRequests = async (id) =>
  await axios.get(`http://localhost:4000/trainers/${id}/athletes`);

export const getSessionsRequest = async () =>
  await axios.get("http://localhost:4000/athletes/4/sessions");

export const getSessionRequest = async (id) =>
  await axios.get(`http://localhost:4000/sessions/${id}`);

export const getAllAthletesRequest = async () =>
  await axios.get(`http://localhost:4000/athletes/`);

export const getAthleteRequest = async (id) =>
  await axios.get(`http://localhost:4000/athletes/${id}`);

export const getAthleteSessionsRequest = async (id) =>
  await axios.get(`http://localhost:4000/athletes/${id}/sessions`);

export const getExecutionsRequest = async () =>
  await axios.get("http://localhost:4000/sessions/2/executions");

export const getExerciseProgressionRequest = async (idAthlete, id) =>
  await axios.get(
    `http://localhost:4000/athletes/${idAthlete}/exercises/${id}/progression`
  );

export const getExecutionRequest = async (id) =>
  await axios.get(`http://localhost:4000/executions/${id}`);

export const getExercisesRequest = async (id) =>
  await axios.get(`http://localhost:4000/trainers/${id}/exercises`);

export const getAthleteMealRecordsRequest = async (id) =>
  await axios.get(`http://localhost:4000/athletes/${id}/mealRecords`);

export const getExerciseRequest = async (id) =>
  await axios.get(`http://localhost:4000/exercises/${id}`);

//-------------------POST-------------------//

export const createSessionRequest = async (session) =>
  await axios.post(`http://localhost:4000/sessions`, session);

export const createExerciseRequest = async (exercise) =>
  await axios.post(`http://localhost:4000/exercises`, exercise);

export const createExecutionRequest = async (execution) =>
  await axios.post(`http://localhost:4000/executions`, execution);


//-------------------PUT-------------------//

export const updateSessionRequest = async (id, session) =>
  await axios.put(`http://localhost:4000/sessions/${id}`, session);

export const updateExerciseRequest = async (id, exercise) =>
  await axios.put(`http://localhost:4000/exercises/${id}`, exercise);

export const updateExecutionRequest = async (id, execution) =>
  await axios.put(`http://localhost:4000/executions/${id}`, execution);

export const addAthleteRequest = async (id, idTrainer) =>
  await axios.put(`http://localhost:4000/athletes/${id}/trainers/${idTrainer}/new`);

export const deleteAthleteRequest = async (id, idTrainer) =>
  await axios.put(`http://localhost:4000/athletes/${id}/trainers/${idTrainer}/delete`); 

//------------------DELETE-------------------//

export const deleteSessionRequest = async (id) =>
  await axios.delete(`http://localhost:4000/sessions/${id}`);

export const deleteExerciseRequest = async (id) =>
  await axios.delete(`http://localhost:4000/exercises/${id}`);

export const deleteExecutionRequest = async (id) => 
  await axios.delete(`http://localhost:4000/executions/${id}`);