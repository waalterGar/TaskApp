import { Router } from 'express';
import {getDietitians, getDietitian, createDietitian, updateDietitian, deleteDietitian } from "../controllers/dietitian.controlllers.js";

const router = Router();

router.get("/dietitians", getDietitians);

router.get("/dietitians/:id", getDietitian);

router.post("/dietitians", createDietitian);

router.put("/dietitians/:id", updateDietitian);

router.delete("/dietitians/:id", deleteDietitian);

export default router;