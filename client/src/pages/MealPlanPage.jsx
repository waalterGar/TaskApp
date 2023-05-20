import { useEffect, useState } from "react";
import MealCard from "../components/MealCard";
import TitleHeader from "../components/TitleHeader";
import AthleteHeader from "../components/AthleteHeader";
import { useParams, useNavigate } from "react-router-dom";
import { useMealPlans } from "../context/MealPlanProvider";
import { useAthletes } from "../context/AthleteProvider";

function MealPlanPage() {
  const { mealPlans, loadMealPlans} = useMealPlans();
  const {getAthlete} = useAthletes();
  const [athlete, setAthlete] = useState({
    name: "",
    mail: "",
    phone: "",
    gender: "",
    height: "",
    weight: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect( () => {
    const loadMealPlan = async () => {
      if (params.id) {
        const mealPlans = await loadMealPlans(params.id);
        const athlete = await getAthlete(params.id);
        setAthlete(athlete);
      }
    };
    loadMealPlan();
  }, []);

  function renderHeader() {
    if (athlete.length === 0) return <h1>No athletes yet</h1>;
    console.log(athlete);
    return <AthleteHeader athlete={athlete} key={athlete.id} />
    }

  function renderMain() {
    if (mealPlans.length === 0) return <h1>No meals yet</h1>;
    console.log(mealPlans);

    return mealPlans.map((meal) =>  <MealCard meal={meal} key={meal.id_meal_record} />);
  }

  return (
    <div>
        <TitleHeader title="Meal Plan"/>
        {renderHeader()}
      <div className="text-white px-40 flex"> 
        <div className="w-1/4">Name</div>
        <div className="w-1/4">Quantity</div>
        <div className="w-1/4">Date</div>
        <div className="w-1/4">Eaten</div>
      </div>
      
      <div className="grid grid-cols-1 gap-1.5 px-20">
         {renderMain()}
      </div> 
    </div>
  );
}

export default MealPlanPage;