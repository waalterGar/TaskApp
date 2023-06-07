import { useEffect, useState } from "react";

function MealSelector({meals, onSelectMeal}) {
  const [selectedMeal, setSelectedMeal] = useState('');
  console.log("MealSelector", meals);
  
  const handleMealChange = (event) => {
    const mealId = event.target.value;
    setSelectedMeal(mealId);
    onSelectMeal(mealId);
  };

  return (
    <select className="block w-full p-2 border border-gray-300 bg-slate-600 rounded-md shadow-sm focus:outline-none focus:border-blue-500" /*handle change*/ value={selectedMeal}
    onChange={handleMealChange}>
      {meals.map((meal) => (
        <option key={meal.id_meal} value={meal.id_meal}>
          {meal.name}
        </option>
      ))}
    </select>
  );
}

export default MealSelector;
