import { deleteSessionRequest } from "../api/trainer.api";

function DeleteButton({id, deleteSubject}) {
  return (
    <div>
      <div
        className="bg-zinc-700 text-white rounded-md p-4 flex justify-center items-center px-4 text-xs cursor-pointer"
        onClick={() => handleSubject(id, deleteSubject)}
      >
        <h2 className="text-sm ">Delete</h2>
      </div>
    </div>
  );
}

function handleSubject(id, deleteSubject){
    if(deleteSubject === "session"){
        deleteSessionRequest(id);
        window.location.reload(false);
    }
}

export default DeleteButton;