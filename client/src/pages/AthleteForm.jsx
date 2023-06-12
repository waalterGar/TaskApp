import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAthletes } from "../context/AthleteProvider";
import AthleteSelector from "../components/AthleteSelector";
import { useAuth } from "../context/AuthProvider";
function AthleteForm() {
  const { athletes, addAthlete, getAllAthletes } = useAthletes();
  const [athlete, setAthlete] = useState({
    id: 0
  });
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
 
  useEffect(() => {
    const loadAthletes = async () => {
      const athletes = await getAllAthletes(user.token);
    };
    loadAthletes();
  }, [user]);

  const handleSelectExercise = (athleteId) => {
    //handle change
    console.log("handleSelectAthlete", athleteId);
    setAthlete({
      ...athlete,
      id: athleteId,
    });
  };

  function renderAthleteSelector() {
    if (athletes.length === 0) return <h1>No athletes yet</h1>;
    console.log("renderAthletes",athletes);
    return (
        <AthleteSelector athletes={athletes} onSelectAthlete={handleSelectExercise}/>
    )
  
  }

  return (
    <div className="">
      <Formik
        initialValues={athletes}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log("submit",athlete);
          if (athlete.id) {
            await addAthlete(athlete.id, params.idTrainer, user.token);
          }     
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-zinc-700 text-white max-w-sm rounded-md p-4 mx-auto mt-20"
          >
            <h1 className="text-xl font-bold uppercase text-center">
                Add Athlete
            </h1>
            
            {renderAthleteSelector(handleChange, values)}

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

export default AthleteForm;
