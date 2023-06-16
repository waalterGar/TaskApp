import { useNavigate } from "react-router-dom";

function EditButton({ btnlink, btndisabled}) {
  if(btndisabled) return;
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="bg-zinc-700 text-white rounded-md p-4 flex justify-center items-center px-4 text-xs cursor-pointer"
        onClick={() => navigate(btnlink)}
      >
        <h2 className="text-sm ">Edit</h2>
      </div>
    </div>
  );
}

export default EditButton;
