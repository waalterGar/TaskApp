import axios from "axios";

//-------------------GET-------------------//

export const getAthletesRequests = async (id, token) =>
  await axios.get(`http://localhost:4000/trainers/${id}/athletes`, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const getSessionsRequest = async (token) =>
  await axios.get("http://localhost:4000/athletes/4/sessions", {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const getSessionRequest = async (id, token) =>
  await axios.get(`http://localhost:4000/sessions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const getAllAthletesRequest = async (token) =>
  await axios.get(`http://localhost:4000/athletes/`, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const getAthleteRequest = async (id, token) =>
  await axios.get(`http://localhost:4000/athletes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const getAthleteSessionsRequest = async (id, token) =>
  await axios.get(`http://localhost:4000/athletes/${id}/sessions`,  {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const getExecutionsRequest = async (token) =>
  await axios.get("http://localhost:4000/sessions/2/executions", {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const getExerciseProgressionRequest = async (idAthlete, id, token) =>
  await axios.get(
    `http://localhost:4000/athletes/${idAthlete}/exercises/${id}/progression`, {
      headers: {
        Authorization: `Bearer ${token}`}
     }
  );

export const getExecutionRequest = async (id, token) =>
  await axios.get(`http://localhost:4000/executions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const getExercisesRequest = async (id, token) =>
  await axios.get(`http://localhost:4000/trainers/${id}/exercises`, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const getAthleteMealRecordsRequest = async (id, token) =>
  await axios.get(`http://localhost:4000/athletes/${id}/mealRecords`, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const getExerciseRequest = async (id, token) =>
  await axios.get(`http://localhost:4000/exercises/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

//-------------------POST-------------------//

export const createSessionRequest = async (session, token) =>
  await axios.post(`http://localhost:4000/sessions`, session, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const createExerciseRequest = async (exercise, token) =>
  await axios.post(`http://localhost:4000/exercises`, exercise, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const createExecutionRequest = async (execution, token) =>
  await axios.post(`http://localhost:4000/executions`, execution, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const loginTrainerRequest = async (trainer, token) =>
  await axios.post(`http://localhost:4000/trainer/login`, trainer, {
    headers: {
      Authorization: `Bearer ${token}`}
   });
//-------------------PUT-------------------//

export const updateSessionRequest = async (id, session, token) =>
  await axios.put(`http://localhost:4000/sessions/${id}`, session, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const updateExerciseRequest = async (id, exercise, token) =>
  await axios.put(`http://localhost:4000/exercises/${id}`, exercise, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const updateExecutionRequest = async (id, execution, token) =>
  await axios.put(`http://localhost:4000/executions/${id}`, execution, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const addAthleteRequest = async (id, idTrainer, token) =>
  await axios.put(`http://localhost:4000/athletes/${id}/trainers/${idTrainer}/new`,null, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const deleteAthleteRequest = async (id, idTrainer, token) =>
  await axios.put(`http://localhost:4000/athletes/${id}/trainers/${idTrainer}/delete`,null, {
    headers: {
      Authorization: `Bearer ${token}`}
   }); 

//------------------DELETE-------------------//

export const deleteSessionRequest = async (id, token) =>
  await axios.delete(`http://localhost:4000/sessions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const deleteExerciseRequest = async (id, token) =>
  await axios.delete(`http://localhost:4000/exercises/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const deleteExecutionRequest = async (id, token) => 
  await axios.delete(`http://localhost:4000/executions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`}
   });