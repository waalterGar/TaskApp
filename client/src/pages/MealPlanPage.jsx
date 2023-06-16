import { useEffect, useState } from "react";
import MealCard from "../components/MealCard";
import TitleHeader from "../components/TitleHeader";
import AthleteHeader from "../components/AthleteHeader";
import { useParams, useNavigate } from "react-router-dom";
import { useMealRecords } from "../context/MealRecordProvider";
import { useAthletes } from "../context/AthleteProvider";
import EditButton from "../components/EditButton";
import { useAuth } from "../context/AuthProvider";
import DeleteButton from "../components/DeleteButton";

function MealPlanPage() {
  const { mealRecords, loadMealRecords } = useMealRecords();
  const { getAthlete } = useAthletes();
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
  const { user } = useAuth();

  useEffect(() => {
   if (!user) return;
    const loadMealPlan = async () => {
      if (params.id) {
        const mealPlans = await loadMealRecords(params.id, user.token);
        const athlete = await getAthlete(params.id, user.token);
        setAthlete(athlete);
      }
    };
    loadMealPlan();
  }, [user]);

  function renderHeader() {
    if (athlete.length === 0) return <h1>No athletes yet</h1>;
    console.log(athlete);
    return <AthleteHeader athlete={athlete} key={athlete.id} />;
  }

  function renderMain() {
    if (mealRecords.length === 0) return <h1>No meals yet</h1>;
    console.log(mealRecords);
    if (user) {
      return mealRecords.map((meal) => (
        <div className="flex">
          <MealCard meal={meal} key={meal.id_meal_record} />
          <EditButton
            btnlink={`/mealRecords/${meal.id_meal_record}/edit/`} btndisabled={user?user.role==="trainer"?true:false:false}
           />
            <DeleteButton  id={meal.id_meal_record} deleteSubject={"mealRecord"} token ={user?user.token:""}btndisabled={user?user.role==="trainer"?true:false:false}/>
        </div>
        
      ));
    }
    return mealRecords.map((meal) => (
      <div>
        <MealCard meal={meal} key={meal.id_meal_record} />
      </div>
    ));
  }

  return (
    <div>
       <TitleHeader
        title="Meal Plan"
        btntext={"+ Add Meal Recordssss"}
        btnlink={`/sessions/${params.id}/executions/new`}
        role={user? user.role : ""} 
        btndisabled={user?user.role==="trainer"?true:false:false}
       />
      <div className="text-white px-40 flex">
        <div className="w-1/4">Name</div>
        <div className="w-1/4">Quantity</div>
        <div className="w-1/4">Date</div>
        <div className="w-1/4">Eaten</div>
      </div>
      <div className="grid grid-cols-1 gap-1.5 px-20">{renderMain()}</div>
    </div>
  );
}

export default MealPlanPage;
