import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard";
import { useExercises } from "../context/ExerciseProvider";
import TitleHeader from "../components/TitleHeader";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import { useAuth } from "../context/AuthProvider";

function ExerciseListPage() {
  const { exercises, loadExercises } = useExercises();
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log("useEffect", params);
    const loadExercise = async () => {
      if (user) {
        const exercises = await loadExercises(user.id, user.token);
        console.log("usefect", exercises);
      }
    };
    loadExercise();
  }, [user]);

  function renderMain() {
    if (exercises.length === 0) return <h1>No exercises yet</h1>;
    console.log(exercises);
    return exercises.map((exercise) => (
      <div className="flex">
        <ExerciseCard exercise={exercise} key={exercise.id_exercise} />
        <EditButton
          btnlink={`/exercises/${exercise.id_exercise}/edit`}
        />
        <DeleteButton
          id={exercise.id_exercise}
          deleteSubject={"exercise"}
        />
      </div>
    ));
  }

  return (
    <div>
      <TitleHeader
        title="Exercises"
        btntext={"+ Add Exercise"}
        btnlink={`/trainer/${user?user.id:""}/exercises/new`}
        role={user? user.role : ""} />

      <div className="text-white px-40 flex">
        <div className="w-1/3">Name</div>
        <div className="w-1/3">Muscle Group</div>
        <div className="w-1/4 ">Description</div>
      </div>
      <div className="grid grid-cols-1 gap-1.5 px-20">{renderMain()}</div>
    </div>
  );
}

export default ExerciseListPage;
