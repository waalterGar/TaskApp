import { useExecutions } from "../context/ExecutionProvider";
import { useNavigate } from "react-router-dom";

function ExecutionItem({ execution}) {
    const { deleteTask, toggleTask } = useExecutions();
    const navigate = useNavigate();
    const handleDone = async () => {
      await toggleTask(task.id);
    };
   
    return (
      <div className="bg-zinc-700 text-white rounded-md p-4 flex">
        <div className="w-1/5  flex justify-center items-center px-4">
          <h2 className="text-sm font-bold">{execution.num_set}</h2>
        </div>
        <div className="w-1/5  flex justify-center items-center px-4">
          <h2 className="text-sm font-bold">{execution.repetitions}</h2>
        </div>
        <div className="w-1/4  flex justify-center items-center px-4">
          <h2 className="text-sm font-bold">{execution.weight}</h2>
        </div>
        <div className="w-1/5 flex justify-center items-center px-4">
          <h2 className="text-sm font-bold">{execution.rpe}</h2>
        </div>
        <div className="w-1/5  flex justify-center items-center px-4">
          <h2 className="text-sm font-bold">{execution.done == true ? "✅" : "❌"}</h2>
        </div>         
      </div>
    );
  }

export default ExecutionItem;