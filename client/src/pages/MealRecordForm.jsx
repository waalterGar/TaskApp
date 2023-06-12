import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMealRecords } from "../context/MealRecordProvider";
import { useMeals } from "../context/MealProvider";
import MealSelector from "../components/MealSelector";
import { useAuth } from "../context/AuthProvider";

function MealRecordForm() {
  const { getRecord, updateRecord, createRecord } = useMealRecords();
  const { meals, loadMeals } = useMeals();
  const [mealRecord, setMealRecord] = useState({
    meal_id: "",
    date: "",
    quantity: 0,
    eaten: false,
    mealName: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadMeal = async () => {
      if (params.idDietitian) {
        const meals = await loadMeals(params.idDietitian, user.token);
      }
    };
    const loadRecord = async () => {
      console.log(params);
      if (params.idMealRecord && !params.idDietitian) {
        const record = await getRecord(params.idMealRecord, user.token);
        console.log("usefect", record);
        setMealRecord({
          meal_id: record.meal_id,
          date: record.date,
          quantity: record.quantity,
          eaten: record.eaten,
          mealName: record.meal_name,
        });
      }
    };
    loadRecord();
    loadMeal();
  }, [user]);

  const handleSelectMeal = (mealId) => {
    //handle change
    console.log("handleSelectExercise", mealId);
    setMealRecord({
      ...mealRecord,
      meal_id: mealId,
    });
  };

  const renderEaten = () => {
    if (params.idMealRecord) {
      return (
        <div className="flex">Eaten:
          <h2 className="text-sm font-bold">  
            {mealRecord.eaten == true ? "✅" : "❌"}
          </h2>
        </div>
      );
    }
  };

  function renderMeal() {
    if (params.idMealPlan) {
      return <MealSelector meals={meals} onSelectMeal={handleSelectMeal} />;
    }else{
      return <div>
        <h2 className="text-sm font-bold">
          {mealRecord.mealName}
        </h2>
      </div>
    }
  }

  return (
    <div className="">
      <Formik
        initialValues={mealRecord}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values, params);
          if (params.idMealRecord && !params.idDietitian) {
            await updateRecord(params.idMealRecord, values, user.token);
          }

          if (params.idDietitian && params.idMealPlan) {
            values.nutritional_plan_id = params.idMealPlan;
            await createRecord(values, user.token);
          }

          setMealRecord({
            meal_id: "",
            date: "",
            quantity: 0,
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-zinc-700 text-white max-w-sm rounded-md p-4 mx-auto"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.idMealRecord && !params.idDietitian
                ? "Edit Record"
                : "New Record"}
            </h1>

            <label className="block">Meal</label>
            {renderMeal()}

            <label className="block">Quantity</label>
            <input
              type="text"
              name="quantity"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.quantity}
            />

            <label className="block">Date</label>
            <input
              type="text"
              name="date"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.date}
            />

            {renderEaten()}

            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MealRecordForm;
