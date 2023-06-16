import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExecutionCard  from "../components/ExecutionCard";
import ExecutionItem from "../components/ExecutionItem"
import SessionHeader from "../components/SessionHeader";
import TitleHeader from "../components/TitleHeader";
import { useExecutions } from "../context/ExecutionProvider";
import { useSessions } from "../context/SessionProvider";
import { useAuth } from "../context/AuthProvider";

function ExecutionPage() {
  const {user} = useAuth();
  const { executions, loadExecutions } = useExecutions();
  const [session, setSession] = useState({
    name: "",
    description: "",
    session_date: "",
    trainer_notes: "",
  }); 
  const {getSession} = useSessions();
  const params = useParams();
  const navigate = useNavigate();
  console.log("user", user);
  
  useEffect( () => {
    console.log("useEffect", params);
    const loadExecution = async () => {
      if (params.id) {
        if (!user) return;
        const session = await getSession(params.id, user.token);
        const executions = await loadExecutions(params.id, user.token);
        console.log("usefect", executions);
        setSession({
          name: session.name,
          description: session.description,
          session_date: session.session_date,
          trainer_notes: session.trainer_notes
        });  
      }
    };
    loadExecution();
  }, [user]);

  function renderHeader() {
    if (session.length === 0) return <h1>No sessions yet</h1>;
    console.log(session);
    return <SessionHeader session={session} key={session.id} />
  }

  function renderMain() {
    if (executions.length === 0) return <h1>No executions yet</h1>;
    const keys = Object.keys(executions);
    return (
      <div>
        {keys.map((exercise) => {
          return (
            <div  className="grid-cols-2 m-1 flex">
              <ExecutionCard exercise={exercise} exerciseId={executions[exercise][0].exercise_id} params={params}/>
              <div className="grid grid-cols-1 gap-1 ">
                {executions[exercise].map((execution) => (
                  <ExecutionItem execution={execution} key={execution.id_execution} editisabled={user?user.role==="dietitian"?true:false:false} deleteisabled={user?user.role==="dietitian"?true:false:false} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <TitleHeader
        title="Executions"
        btntext={"+ Add Execution"}
        btnlink={`/sessions/${params.id}/executions/new`}
       role={user? user.role : ""} 
       btndisabled={user?user.role==="dietitian"?true:false:false}
       />
      {renderHeader()}
      <div className="text-white px-40 flex"> 
        <div className="w-1/4">Exercise</div>
        <div className="w-1/4">No. Set</div>
        <div className="w-1/4 ">No. Rep</div>
        <div className="w-1/4 px-0">Weight (Kg)</div>
        <div className="w-1/4 px-10">RPE/RIR</div>
        <div className="w-1/4 px-10">Done</div>
      </div>
      <div className="grid grid-cols-1 gap-1.5 px-20">
         {renderMain()}
      </div> 
    </div>
  );
}

export default ExecutionPage;