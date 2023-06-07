import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard";
import { useExercises } from "../context/ExerciseProvider";
import TitleHeader from "../components/TitleHeader";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";

function ExerciseListPage() {
  const { exercises, loadExercises } = useExercises();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadExercise = async () => {
      if (params.id) {
        const exercises = await loadExercises(params.id);
        console.log("usefect", exercises);
      }
    };
    loadExercise();
  }, []);

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
        btntext={"Add Exercise"}
        btnlink={`/trainer/${params.id}/exercises/new`}
      />

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
