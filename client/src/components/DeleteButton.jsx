import { deleteSessionRequest, deleteExerciseRequest, deleteExecutionRequest } from "../api/trainer.api";
import { deleteMealRequest, deleteRecordRequest } from "../api/dietitian.api";
import { deleteDietitianAthlete  } from "../api/dietitian.api";
import { deleteTrainerAthlete } from "../api/trainer.api";

function DeleteButton({id, secondId, deleteSubject, role, token, btndisabled}) {
  if(btndisabled) return (<div></div>)
  return (
    <div>
      <div
        className="bg-zinc-700 text-white rounded-md p-4 flex justify-center items-center px-4 text-xs cursor-pointer"
        onClick={() => handleSubject(id, secondId, deleteSubject, role, token)}
      >
        <h2 className="text-sm ">Delete</h2>
      </div>
    </div>
  );
}

function handleSubject(id,secondId, deleteSubject, role, token){
    console.log("deleteSubject: " + id + " " + secondId + " " + deleteSubject + " " + role + " " + token);
    if(deleteSubject === "session"){
        deleteSessionRequest(id);
        window.location.reload(false);
    }
    if(deleteSubject === "exercise"){
        deleteExerciseRequest(id);
        window.location.reload(false);
    }
    if(deleteSubject === "execution"){
        deleteExecutionRequest(id);
        window.location.reload(false);
    }
    if(deleteSubject === "athlete"){
      if(role === "dietitian"){
        deleteDietitianAthlete(id, secondId, token);
        window.location.reload(false);
      }
      if(role === "trainer"){
        deleteTrainerAthlete(id, secondId, token);
        window.location.reload(false);
      }
    }
    if(deleteSubject === "meal"){
        deleteMealRequest(id);
        window.location.reload(false);
    }

    if(deleteSubject === "mealRecord"){
      deleteRecordRequest(id);
      window.location.reload(false);
    }
}

export default DeleteButton;