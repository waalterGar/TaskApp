import {  useMealRecords } from "../context/MealRecordProvider";
import { useNavigate } from "react-router-dom";

function MealCard({ meal }) {
  const navigate = useNavigate();
 
  return (
    <div className="bg-zinc-700 text-white rounded-md p-4 flex cursor-pointer" /*onClick={() =>}*/>
       
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">{meal.meal_name}</h2>
    </div>
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">{meal.quantity}</h2>
    </div>
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">{meal.date}</h2>
        
    </div>
    <div className="w-1/4  flex justify-center items-center px-4">
        <h2 className="text-sm ">{meal.eaten == true ? "✅" : "❌"}</h2>  
    </div> 
</div>
  );
}

export default MealCard;