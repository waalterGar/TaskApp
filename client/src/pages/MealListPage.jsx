import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MealItem from "../components/MealItem";
import TitleHeader from "../components/TitleHeader";
import { useMeals } from "../context/MealProvider";

function MealListPage() {
  const { meals, loadMeals } = useMeals();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadMeals(params.id);
  }, []);

  function renderMain() {
    if (meals.length === 0) return <h1>No meals yet</h1>;
    console.log(meals);
    return meals.map((meal) => <MealItem meal={meal} params={params} key={meal.id_exercise} />);
  }

  return (
    <div>
      <TitleHeader title="My meals"  btntext={"+ Add Meal"}/>
      <div className="grid grid-cols-3 gap-1.5 px-20">
         {renderMain()}
      </div> 
    </div>
  );
}

export default MealListPage;