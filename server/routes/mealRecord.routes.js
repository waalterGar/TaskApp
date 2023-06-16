import { Router } from 'express';
import { getMealRecords, getMealRecord, createMealRecord, updateMealRecord, deleteMealRecord, setCompleted } from "../controllers/mealRecord.controllers.js";

const router = Router();

router.get("/mealRecords", getMealRecords);

router.get("/mealRecords/:id", getMealRecord);

router.post("/mealRecords", createMealRecord);

router.put("/mealRecords/:id", updateMealRecord);

router.put("/mealRecords/:id/setCompleted", setCompleted);

router.delete("/mealRecords/:id", deleteMealRecord);

export default router;