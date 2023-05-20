import { useEffect, useState } from "react";
import TaskCard from "../components/AthleteCard";
import TitleHeader from "../components/TitleHeader";
import { useAthletes } from "../context/AthleteProvider";

function AthletesPage() {
  const { athletes, loadAthletes } = useAthletes();

  useEffect(() => {
    loadAthletes()
  }, []);

  function renderMain() {
    if (athletes.length === 0) return <h1>No athletes yet</h1>;
    console.log(athletes);
    return athletes.map((athlete) => <TaskCard athlete={athlete} key={athlete.id} />);
  }

  return (
    <div>
      <TitleHeader title="My Athletes"/>
      <div className="text-white px-40 flex"> 
        <div className="w-1/4">Name</div>
        <div className="w-1/4 ">Contact Info</div>
        <div className="w-1/4 px-0">Rountine</div>
        <div className="w-1/4 px-10">Meal Plan</div>
      </div>
      <div className="grid grid-cols-1 gap-1.5 px-20">
         {renderMain()}
      </div> 
    </div>
  );
}

export default AthletesPage;