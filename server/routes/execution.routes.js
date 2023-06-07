import { Router } from 'express';
import { createExecution, getExecution, getExecutions, updateExecution, deleteExecution } from "../controllers/execution.controllers.js";

const router = Router();

router.get("/executions", getExecutions);

router.get("/executions/:id", getExecution);

//router.post("/executions", createExecution);

router.put("/executions/:id", updateExecution);

router.delete("/executions/:id", deleteExecution);

export default router;