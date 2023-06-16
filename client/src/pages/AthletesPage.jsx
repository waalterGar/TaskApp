import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AthleteCard from "../components/AthleteCard";
import TitleHeader from "../components/TitleHeader";
import { useAthletes } from "../context/AthleteProvider";
import DeleteButton from "../components/DeleteButton";
import { useAuth } from "../context/AuthProvider";

function AthletesPage() {
  const { user } = useAuth();
  const { athletes, loadAthletes } = useAthletes();
  const params = useParams();
  const navigate = useNavigate();
  console.log("user", user);
 
  useEffect(() => {
    const fetchAthletes = async () => {
        console.log("fetchAthletes", user.id , user.role, user.token);
        if (!user) return;
        const athletes = await loadAthletes(user.id, user.role ,user.token);
    };
    fetchAthletes();
  }, [user]);

  function renderMain() {
    if (athletes.length === 0) return <h1>No athletes yet</h1>;
    console.log(params);
    console.log(athletes);
    return athletes.map((athlete) => (
      <div className="flex">
        <AthleteCard  athlete={athlete} key={athlete.id} trainerId={user?user.id:""} />
        <DeleteButton id={athlete.id} secondId={user? user.id:""} role={user?user.role:""} deleteSubject={"athlete"}/>
      </div>
    ));
  }

  return (
    <div>
      <TitleHeader
        title="My Athletes"
        btntext={"+ Add Athlete"}
        btnlink={`/athletes/new`}
        role={user? user.role : ""}
      />
      <div className="text-white px-40 flex">
        <div className="w-1/4">Name</div>
        <div className="w-1/4 ">Contact Info</div>
        <div className="w-1/4 px-0">Rountine</div>
        <div className="w-1/4 px-10">Meal Plan</div>
      </div>
      <div className="grid grid-cols-1 gap-1.5 px-20">{renderMain()}</div>
    </div>
  );
}

export default AthletesPage;
