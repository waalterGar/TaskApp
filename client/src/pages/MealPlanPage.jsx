import { useEffect, useState } from "react";
import MealCard from "../components/MealCard";
import TitleHeader from "../components/TitleHeader";
import AthleteHeader from "../components/AthleteHeader";
import { useParams, useNavigate } from "react-router-dom";
import { useMealRecords } from "../context/MealRecordProvider";
import { useAthletes } from "../context/AthleteProvider";
import EditButton from "../components/EditButton";
import { useAuth } from "../context/AuthProvider";

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
    if (params.idDietitian) {
      return mealRecords.map((meal) => (
        <div className="flex">
          <MealCard meal={meal} key={meal.id_meal_record} />
          <EditButton
            btnlink={`/mealRecords/${meal.id_meal_record}/edit/`}
           />
        </div>
      ));
    }
    return mealRecords.map((meal) => (
      <div>
        <MealCard meal={meal} key={meal.id_meal_record} />
      </div>
    ));
  }

  function renderTitleHeader() {
    if (params.idDietitian) {
      return (
        <TitleHeader
          title="Meal Plan"
          btntext={"+ Add Meal Record"}
          btnlink={`/dietitians/${params.idDietitian}/mealPlan/${params.idMealPlan}/mealRecords/new`}
        />
      );
    }
    return (
      <TitleHeader
        title="Meal Plan"
        btntext={"+ Add Meal Record"}
      />
    );
  }

  return (
    <div>
      {renderTitleHeader()}
      {renderHeader()}
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
