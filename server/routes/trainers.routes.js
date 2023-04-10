import { Router } from 'express';
import { getTrainers, getTrainer, createTrainer, updateTrainer, deleteTrainer } from "../controllers/trainers.controllers.js";

const router = Router();

router.get("/trainers", getTrainers);

router.get("/trainers/:id", getTrainer);

router.post("/trainers", createTrainer);

router.put("/trainers/:id", updateTrainer);

router.delete("/trainers/:id", deleteTrainer);

export default router;