import { useEffect, useState } from "react";
import SessionCard from "../components/SessionCard";
import TitleHeader from "../components/TitleHeader";
import AthleteHeader from "../components/AthleteHeader";
import EditButton from "../components/EditButton";
import { useParams, useNavigate } from "react-router-dom";
import { useSessions } from "../context/SessionProvider";
import { useAthletes } from "../context/AthleteProvider";
import DeleteButton from "../components/DeleteButton";

function SessionsPage() {
  const { sessions, loadSessions } = useSessions();
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

  useEffect(() => {
    const loadSession = async () => {
      if (params.id) {
        const sessions = await loadSessions(params.id);
        const athlete = await getAthlete(params.id);
        setAthlete(athlete);
      }
    };
    loadSession();
  }, []);

  function renderHeader() {
    if (athlete.length === 0) return <h1>No athletes yet</h1>;
    console.log(athlete);
    return <AthleteHeader athlete={athlete} key={athlete.id} />;
  }

  function renderMain() {
    if (sessions.length === 0) return <h1>No sessions yet</h1>;
    console.log(sessions);
    return sessions.map((session) => (
      <div className="flex">
        <SessionCard session={session} athlete={athlete} key={session.id} />
        <EditButton btnlink={`/sessions/${session.id_training_session}/edit/`} />
        <DeleteButton id={session.id_training_session} deleteSubject={"session"} />
      </div>
    ));
  }

  return (
    <div>
      <TitleHeader
        title="Routine"
        btntext={"Add Session"}
        btnlink={`/routines/${params.id}/sessions/new/`}
      />
      {renderHeader()}
      <div className="text-white px-40 flex">
        <div className="w-1/4">Name</div>
        <div className="w-1/4">Date</div>
        <div className="w-1/4 px-20">Description</div>
        <div className="w-1/4 px-20">Trainer Notes</div>
      </div>
      <div className="grid grid-cols-1 gap-1.5 px-20">{renderMain()}</div>
    </div>
  );
}

export default SessionsPage;
