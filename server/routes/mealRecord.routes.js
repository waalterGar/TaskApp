import { Router } from 'express';
import { getMealRecords, getMealRecord, createMealRecord, updateMealRecord, deleteMealRecord } from "../controllers/mealRecord.controllers.js";

const router = Router();

router.get("/mealRecords", getMealRecords);

router.get("/mealRecords/:id", getMealRecord);

router.post("/mealRecords", createMealRecord);

router.put("/mealRecords/:id", updateMealRecord);

router.delete("/mealRecords/:id", deleteMealRecord);

export default router;