import { useMeals } from "../context/MealProvider";
import { useNavigate } from "react-router-dom";

function MealItem({ meal, params }) {
  const {} = useMeals();
  const navigate = useNavigate();
  console.log("params",params);
  
  return (
    <div className="bg-zinc-700 text-white rounded-md p-4 flex cursor-pointer" onClick={() =>navigate(`/dietitians/${params.id}/meals/${meal.id_meal}`)}>
       
    <div className="w-1/4 justify-center items-center px-4">
    <h2 className="text-sm ">{meal.id_meal}</h2>
        <h2 className="text-sm ">{meal.name}</h2>
    </div>
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">{meal.calories} Kcal</h2>
    </div>
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">{meal.fat} g</h2>  
    </div> 
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">{meal.carbohydrates} g</h2>  
    </div>  
    <div className="w-1/4 justify-center items-center px-4">
        <h2 className="text-sm ">{meal.protein} g</h2> 
    </div>
</div>
  );
}

export default MealItem;