import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MealItem from "../components/MealItem";
import TitleHeader from "../components/TitleHeader";
import { useMeals } from "../context/MealProvider";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import { useAuth } from "../context/AuthProvider";

function MealListPage() {
  const { meals, loadMeals } = useMeals();
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchMeals = async () => {
     const meals  =  await loadMeals(params.id, user.token);
    };
    fetchMeals();
  }, [user]);

  function renderMain() {
    if (meals.length === 0) return <h1>No meals yet</h1>;
    console.log(meals);
    return meals.map((meal) => (
      <div>
        <MealItem meal={meal} params={params} key={meal.id_meal} />
        <EditButton btnlink={`/dietitians/${params.id}/meals/${meal.id_meal}/edit`}/>
        <DeleteButton deleteSubject={"meal"} id={meal.id_meal}/>
      </div>
    ));
  }

  return (
    <div>
      <TitleHeader
        title="My meals"
        btntext={"+ Add Meal"}
        btnlink={`/dietitians/${params.id}/meals/new`}
      />
      <div className="grid grid-cols-3 gap-1.5 px-20">{renderMain()}</div>
    </div>
  );
}

export default MealListPage;
