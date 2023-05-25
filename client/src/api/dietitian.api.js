import axios from "axios";

export const getMealsRequest = async (id) =>
  await axios.get(`http://localhost:4000/dietitians/${id}/meals`);
 
export const getMealRequest = async (id, idMeal) =>
  await axios.get(`http://localhost:4000/dietitians/${id}/meals/${idMeal}`);