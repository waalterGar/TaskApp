import { Router } from 'express';
import {getDietitians, getDietitian, createDietitian, updateDietitian, deleteDietitian,
    getAthletes, addAthlete, deleteAthlete, getAthlete, createNutritionalPlan, 
    createMeal, editMeal, deleteMeal, addMealRecord, editMealRecord, 
    deleteMealRecord, getProgression, getAthleteMealRecords, getMeals, getMeal, dietitianRegister, dietitianLogin} from "../controllers/dietitian.controlllers.js";

const router = Router();

//-------------------GET-------------------//
router.get("/dietitians", getDietitians);

router.get("/dietitians/:id", getDietitian);

router.get("/dietitians/:id/athletes", getAthletes);

router.get("/dietitians/:id/athletes/:athleteId", getAthlete);

router.get("/sessions/:sessionId/executions/:exerciseId", getProgression);

router.get("/athletes/:athleteId/mealRecords", getAthleteMealRecords);

router.get("/dietitians/:id/meals", getMeals)

router.get("/dietitians/:dietitianId/meals/:mealId", getMeal)
//-------------------POST-------------------//
router.post("/dietitians", createDietitian);

router.post("/dietitians/:dietitianId/athletes/:athleteId/plans", createNutritionalPlan);

router.post("/dietitians/:dietitianId/meals", createMeal);

router.post("/plans/:planId/mealRecords", addMealRecord);

router.post("/dietitian/login", dietitianLogin);

router.post("/dietitian/register", dietitianRegister);
//-------------------PUT-------------------//
router.put("/dietitians/:id", updateDietitian);

router.put("/dietitians/:dietitianId/meals/:mealId", editMeal);

router.put("/dietitians/:dietitianId/athletes/:athleteId/add", addAthlete);

router.put("/dietitians/:dietitianId/athletes/:athleteId/delete", deleteAthlete);

router.put("/plans/:planId/mealRecords/:mealRecordId", editMealRecord);
//------------------DELETE-------------------//
router.delete("/dietitians/:id", deleteDietitian);

router.delete("/dietitians/:dietitianId/meals/:mealId", deleteMeal);

router.delete("/plans/:planId/mealRecords/:mealRecordId", deleteMealRecord);

export default router;