import { Form, Formik } from "formik";
import {  useExercises } from "../context/ExerciseProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

function ExerciseForm() {
  const { getExercise,createExercise,updateExercise } = useExercises();
  const [exercise, setExercise] = useState({
    name: "",
    description: "",
    muscle_group: "",
  }); 
  const params = useParams();
  const navigate = useNavigate();
  const {user} = useAuth();

  useEffect( () => {
    const loadExercise = async () => {
      if (params.id) {
        const exercise = await getExercise(params.id, user.token);
        console.log("usefect",exercise);
        setExercise({
            name: exercise.name,
            description: exercise.description,
            muscle_group: exercise.muscle_group,
        });
      }
    };
    loadExercise();
  }, [user]);
  return (
    <div className="">
      <Formik
        initialValues={exercise}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values, params);
          if(params.id){
            await updateExercise(params.id, values, user.token);
        } 
        
          if (params.idTrainer) {
            await createExercise(values, params.idTrainer, user.token);
        }

        setExercise({
            name: "",
            description: "",
            muscle_group: "",
        });
      }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="bg-zinc-700 text-white max-w-sm rounded-md p-4 mx-auto">
            <h1 className="text-xl font-bold uppercase text-center">{params.id ? "Edit Exercise" : "New Exercise"}</h1>
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

            <label className="block">Muscle group</label>
            <input
              type="text"
              name="muscle_group"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.muscle_group}
            />

            <button type="submit" disabled={isSubmitting} className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md">
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ExerciseForm;
