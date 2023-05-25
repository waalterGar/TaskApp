import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MealDetailCard from "../components/MealDetailCard";
import TitleHeader from "../components/TitleHeader";
import { useMeals } from "../context/MealProvider";

function MealDetailPage() {
  const {getMeal} = useMeals();
  const params = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState({
    name: "",
    description: "",
    recipe: "",
    calories: "",
    protein: "",
    carbohydrates: "",
    fat: "",
  });

  useEffect(() => {
    const loadSession = async () => {
        if (params.id && params.idMeal ) {
          const meal = await getMeal(params.id, params.idMeal);
          setMeal(meal);
        }
      };
      loadSession();
  }, []);

  function renderMain() {
    if (meal.length === 0) return <h1>No meals yet</h1>;
    console.log(meal);
    return  (<MealDetailCard meal={meal} key={meal.id_exercise} />);
  }

  return (
    <div>
      <TitleHeader title="Meal Details"/>
         {renderMain()}
    </div> 
  );
}

export default MealDetailPage;