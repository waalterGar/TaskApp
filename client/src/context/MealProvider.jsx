import { useContext, useState } from "react";
import {
  getMealsRequest, getMealRequest, updateMealRequest, createMealRequest
} from "../api/dietitian.api";
import { MealContext } from "./MealContext";

export const useMeals = () => {
  const context = useContext(MealContext);
  if (!context)
    throw new Error("useMeals must be used within a SessionContextProvider");

  return context;
};

export const MealContextProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);

  async function loadMeals(id, token) {
    const response = await getMealsRequest(id, token);
    setMeals(response.data);
  }

  async function getMeal(id, idMeal, token) {
    try {
        const response = await getMealRequest(id, idMeal, token);
        return response.data;
      } catch (error) {
        console.error(error);
      }
  }

  const updateMeal = async (id, exercise, token) => {
    try {
      const response = await updateMealRequest(id, exercise, token);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const createMeal = async (meal, idDietitian, token) => {
    try {
      //make a copy of idDietitian parsed to integer
      console.log("meal", meal, "idDietitian", idDietitian);
      meal.dietitian_id = idDietitian
      const response = await createMealRequest(meal, token);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
    

    return (
    <MealContext.Provider
      value={{
        meals,
        loadMeals, 
        getMeal,
        updateMeal,
        createMeal
      }}
    >
      {children}
    </MealContext.Provider>
  );
};