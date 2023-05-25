import { useContext, useState } from "react";
import {
  getMealsRequest,getMealRequest
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

  async function loadMeals(id) {
    const response = await getMealsRequest(id);
    setMeals(response.data);
  }

  async function getMeal(id, idMeal) {
    try {
        const response = await getMealRequest(id, idMeal);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
    

    return (
    <MealContext.Provider
      value={{
        meals,
        loadMeals, 
        getMeal
      }}
    >
      {children}
    </MealContext.Provider>
  );
};