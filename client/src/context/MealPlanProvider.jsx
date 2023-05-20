import { useContext, useState } from "react";
import {
  getAthleteMealPlansRequest,
} from "../api/trainer.api";
import { MealPlanContext } from "./MealPlanContext";

export const useMealPlans = () => {
  const context = useContext(MealPlanContext);
  if (!context)
    throw new Error("useMealPlan must be used within a SessionContextProvider");

  return context;
};

export const MealPlanContextProvider = ({ children }) => {
  const [mealPlans, setMealPlans] = useState([]);

  async function loadMealPlans(id) {
    const response = await getAthleteMealPlansRequest(id);
    setMealPlans(response.data);
  }

    return (
    <MealPlanContext.Provider
      value={{
        mealPlans,
        loadMealPlans
      }}
    >
      {children}
    </MealPlanContext.Provider>
  );
};