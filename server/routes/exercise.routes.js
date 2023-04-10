import { Router } from 'express';
import {getExercises, getExercise, createExercise, updateExercise, deleteExercise} from "../controllers/exercise.controllers.js";

const router = Router();

router.get("/exercises", getExercises);

router.get("/exercises/:id", getExercise);

router.post("/exercises", createExercise);

router.put("/exercises/:id", updateExercise);

router.delete("/exercises/:id", deleteExercise);

export default router;