import { Router } from 'express';
import { getMeals, getMeal, updateMeal} from "../controllers/meal.controllers.js";

const router = Router();

router.get("/meals", getMeals );

router.get("/meals/:id", getMeal );

//router.post("/meals", createMeal);

router.put("/meals/:id", updateMeal);

//router.delete("/meals/:id", deleteMeal);

export default router;