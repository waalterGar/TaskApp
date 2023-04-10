import { Router } from 'express';
import { getRoutines, getRoutine, createRoutine, updateRoutine, deleteRoutine} from "../controllers/routine.controllers.js";

const router = Router();

router.get("/routines", getRoutines);

router.get("/routines/:id", getRoutine);

router.post("/routines",createRoutine);

router.put("/routines/:id", updateRoutine);

router.delete("/routines/:id", deleteRoutine);

export default router;