import { Form, Formik } from "formik";
import { useMeals } from "../context/MealProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

function MealForm() {
  const { getMeal, updateMeal, createMeal } = useMeals();
  const [meal, setMeal] = useState({
    name: "",
    description: "",
    recipe: "",
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
  });
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadMeal = async () => {
        console.log("params", params);
      if (params.id) {
        const meal = await getMeal(params.idDietitian, params.id, user.token);
        console.log("usefect", meal);
        setMeal({
          name: meal.name,
          description: meal.description,
          recipe: meal.recipe,
          calories: meal.calories,
          protein: meal.protein,
          carbohydrates: meal.carbohydrates,
          fat: meal.fat,
        });
      }
    };
    loadMeal();
  }, [user]);
  return (
    <div className="">
      <Formik
        initialValues={meal}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values, params);

          if (params.idDietitian && !params.id) {
            await createMeal(values, params.idDietitian, user.token);
          }

          if (params.id) {
            await updateMeal(params.id, values, user.token);
          }
          
          setExercise({
            name: "",
            description: "",
            recipe: "",
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0,
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-zinc-700 text-white max-w-sm rounded-md p-4 mx-auto"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? "Edit Meal" : "New Meal"}
            </h1>

            <label className="block">name</label>
            <input
              type="text"
              name="name"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.name}
            />

            <label className="block">description</label>
            <textarea
              name="description"
              rows="3"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a description"
              onChange={handleChange}
              value={values.description}
            ></textarea>

            <label className="block">recipe</label>
            <textarea
              name="recipe"
              rows="3"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a recipe"
              onChange={handleChange}
              value={values.recipe}
            ></textarea>

            <label className="block">Calories</label>
            <input
              type="text"
              name="calories"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.calories}
            />

            <label className="block">Protein</label>
            <input
                type="text"
                name="protein"
                className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
                placeholder="Write Protein"
                onChange={handleChange}
                value={values.protein}
            />

            <label className="block">Carbohydrates</label>
            <input
                type="text"
                name="carbohydrates"
                className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
                placeholder="Write Carbohydrates"
                onChange={handleChange}
                value={values.carbohydrates}
            />

            <label className="block">Fat</label>
            <input
                type="text"
                name="fat"
                className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
                placeholder="Write Fat"
                onChange={handleChange}
                value={values.fat}
            />

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

export default MealForm;
