import axios from "axios";

// -------------------GET-------------------//
export const getMealsRequest = async (id) =>
  await axios.get(`http://localhost:4000/dietitians/${id}/meals`);
 
export const getMealRequest = async (id, idMeal) =>
  await axios.get(`http://localhost:4000/dietitians/${id}/meals/${idMeal}`);

export const getMealRecordRequest = async (id) =>
  await axios.get(`http://localhost:4000/mealRecords/${id}`);

export const getRecordRequest = async (id) =>
  await axios.get(`http://localhost:4000/mealRecords/${id}`);
// -------------------POST-------------------//
export const createMealRequest = async (meal) =>
  await axios.post(`http://localhost:4000/meals`, meal);

export const createRecordRequest = async (record) =>
  await axios.post(`http://localhost:4000/mealRecords`, record);

export const loginDietitianRequest = async (dietitian) =>
  await axios.post(`http://localhost:4000/dietitian/login`, dietitian);
// -------------------PUT-------------------//
  export const updateMealRequest = async (id, meal) =>
  await axios.put(`http://localhost:4000/meals/${id}`, meal);

  export const updateRecordRequest = async (id, record) =>
  await axios.put(`http://localhost:4000/mealRecords/${id}`, record);
// ------------------DELETE-------------------//
export const deleteMealRequest = async (id) =>
  await axios.delete(`http://localhost:4000/meals/${id}`);
  
export const deleteRecordRequest = async (id) =>
  await axios.delete(`http://localhost:4000/mealRecords/${id}`);