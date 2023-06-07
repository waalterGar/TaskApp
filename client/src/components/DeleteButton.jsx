import { deleteSessionRequest, deleteExerciseRequest, deleteExecutionRequest, deleteAthleteRequest } from "../api/trainer.api";
import { deleteMealRequest } from "../api/dietitian.api";

function DeleteButton({id, secondId, deleteSubject}) {
  return (
    <div>
      <div
        className="bg-zinc-700 text-white rounded-md p-4 flex justify-center items-center px-4 text-xs cursor-pointer"
        onClick={() => handleSubject(id, secondId, deleteSubject)}
      >
        <h2 className="text-sm ">Delete</h2>
      </div>
    </div>
  );
}

function handleSubject(id,secondId, deleteSubject){
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
        deleteAthleteRequest(id, secondId);
        window.location.reload(false);
    }
    if(deleteSubject === "meal"){
        deleteMealRequest(id);
        window.location.reload(false);
    }
}

export default DeleteButton;