import axios from "axios";

// -------------------GET-------------------//
export const getMealsRequest = async (id, token) =>
  await axios.get(`http://localhost:4000/dietitians/${id}/meals`,{
    headers: {
      Authorization: `Bearer ${token}`}
   });
 
export const getMealRequest = async (id, idMeal, token) =>
  await axios.get(`http://localhost:4000/dietitians/${id}/meals/${idMeal}`,{
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const getMealRecordRequest = async (id, token) =>
  await axios.get(`http://localhost:4000/mealRecords/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const getRecordRequest = async (id, token) =>
  await axios.get(`http://localhost:4000/mealRecords/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`}
   });

  export const getDietitianAthletesRequest = async (id, token) =>
   await axios.get(`http://localhost:4000/dietitians/${id}/athletes`, {
     headers: {
       Authorization: `Bearer ${token}`}
    });


// -------------------POST-------------------//
export const createMealRequest = async (meal, token) =>
  await axios.post(`http://localhost:4000/meals`, meal,{
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const createRecordRequest = async (record, token) =>
  await axios.post(`http://localhost:4000/mealRecords`, record, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

export const loginDietitianRequest = async (dietitian, token) =>
  await axios.post(`http://localhost:4000/dietitian/login`, dietitian ,{
    headers: {
      Authorization: `Bearer ${token}`}
   });

// -------------------PUT-------------------//
  export const updateMealRequest = async (id, meal, token) =>
  await axios.put(`http://localhost:4000/meals/${id}`, meal ,{
    headers: {
      Authorization: `Bearer ${token}`}
   });

  export const updateRecordRequest = async (id, record, token) =>
  await axios.put(`http://localhost:4000/mealRecords/${id}`, record, {
    headers: {
      Authorization: `Bearer ${token}`}
   });

  export const addDietitianAthleteRequest = async (id, idDietitian, token) =>
   await axios.put(`http://localhost:4000/athletes/${id}/dietitians/${idDietitian}/new`,null, {
     headers: {
       Authorization: `Bearer ${token}`}
    });

    export const deleteDietitianAthlete = async (id, idDietitian, token) =>
    await axios.put(`http://localhost:4000/athletes/${id}/dietitians/${idDietitian}/delete`,null, {
      headers: {
        Authorization: `Bearer ${token}`}
     });
// ------------------DELETE-------------------//
export const deleteMealRequest = async (id, token) =>
  await axios.delete(`http://localhost:4000/meals/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`}
   });
  
export const deleteRecordRequest = async (id, token) =>
  await axios.delete(`http://localhost:4000/mealRecords/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`}
   });
