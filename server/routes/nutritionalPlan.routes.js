import { Router } from 'express';
import { getPlans, getPlan, createPlan, updatePlan, deletePlan} from "../controllers/nutritionalPlan.controllers.js";

const router = Router();

router.get("/plans", getPlans);

router.get("/plans/:id", getPlan);

router.post("/plans", createPlan);

router.put("/plans/:id", updatePlan);

router.delete("/plans/:id", deletePlan);

export default router;