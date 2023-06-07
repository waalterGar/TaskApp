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

  const updateMeal = async (id, exercise) => {
    try {
      const response = await updateMealRequest(id, exercise);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const createMeal = async (meal, idDietitian) => {
    try {
      //make a copy of idDietitian parsed to integer
      let parsed_idDietitian = parseInt(idDietitian);
      meal.dietitian_id = parsed_idDietitian;
      const response = await createMealRequest(meal);
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