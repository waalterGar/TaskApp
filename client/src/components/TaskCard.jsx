import { useTasks } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {
  const { deleteTask, toggleTask } = useTasks();
  const navigate = useNavigate();
  const handleDone = async () => {
    await toggleTask(task.id);
  };

  return (
    <div className="bg-zinc-700 text-white rounded-md p-4">
      <header className="flex justify-between">
        <h2 className="text-sm font-bold">{task.title}</h2>
        <span>{task.done == true ? "✅" : "❌"}</span>
      </header>
      <p className="text-xs">{task.description}</p>
      <span>{task.createdAt}</span>
      <div className="flex gap-x-1">
        <button className="bg-slate-300 px-2 py-1 text-black rounded-md" onClick={() => deleteTask(task.id)}>Delete</button>
        <button className="bg-slate-300 px-2 py-1 text-black rounded-md" onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
        <button className="bg-slate-300 px-2 py-1 text-black rounded-md" onClick={() => handleDone(task.done)}>Toggle task</button>
      </div>
    </div>
  );
}

export default TaskCard;
