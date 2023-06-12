import { Form, Formik } from "formik";
import { useExecutions } from "../context/ExecutionProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useExercises } from "../context/ExerciseProvider";
import ExerciseSelector from "../components/ExerciseSelector";
import { useAuth } from "../context/AuthProvider";

function ExecutionForm() {
  const { getExecution, createExecution, updateExecution } = useExecutions();
  const {exercises, loadExercises} = useExercises();
  const [execution, setExecution] = useState({
    num_set: "",
    repetitions: "",
    weight: "",
    rpe: "",
    rir: "",
    exercise_id: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  const {user} = useAuth();

  useEffect(() => {
    const loadExercise = async () => {
      if (params.id) {
        const exercises = await loadExercises(params.idTrainer, user.token);
      }
    };
    const loadExecution = async () => {
      console.log(params);
      if (params.id && !params.idTrainer) {
        const execution = await getExecution(params.id, user.token);
        console.log("usefect", execution);
        setExecution({
          num_set: execution.num_set,
          repetitions: execution.repetitions,
          weight: execution.weight,
          rpe: execution.rpe,
          rir: execution.rir,
          exercise_id: execution.exercise_id,
        });
      }     
    };
    loadExecution();
    loadExercise();
  }, [user]);

  const handleSelectExercise = (exerciseId) => {
    //handle change
    console.log("handleSelectExercise", exerciseId);
    setExecution({
      ...execution,
      exercise_id: exerciseId,
    });
  };

  function renderSelector() {
    return (
      <ExerciseSelector exercises={exercises} onSelectExercise={handleSelectExercise}/>
    );
  }
  return (
    <div className="">
      <Formik
        initialValues={execution}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values, params);
          if (params.id) {
            await updateExecution(params.id, values, user.token);
          }

          if (params.idTrainer) {
            values.training_session_id = params.id;
            await createExecution(values, user.token);
          }

          setExecution({
            num_set: "",
            repetitions: "",
            weight: "",
            rpe: "",
            rir: "",
            exercise_id: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-zinc-700 text-white max-w-sm rounded-md p-4 mx-auto"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id && !params.idTrainer ? "Edit Execution" : "New Execution"}
            </h1>

            <label className="block">Num Set</label>
            <input
              type="text"
              name="num_set"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.num_set}
            />

            <label className="block">Repetitions</label>
            <input
              type="text"
              name="repetitions"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.repetitions}
            />

            <label className="block">Weight</label>

            <input
              type="text"
              name="weight"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.weight}
            />

            <label className="block">RPE</label>
            <input
              type="text"
              name="rpe"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.rpe}
            />

            <label className="block">RIR</label>
            <input
              type="text"
              name="rir"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.rir}
            />

            <label className="block">Exercise</label>
            {renderSelector()}
        
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

export default ExecutionForm;
