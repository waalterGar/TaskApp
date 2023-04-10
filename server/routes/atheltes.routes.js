import { Router } from 'express';
import {getAthletes, getAthlete, createAthlete, updateAthlete, deleteAthlete } from "../controllers/athlete.controllers.js";

const router = Router();

router.get("/athletes", getAthletes);

router.get("/athletes/:id", getAthlete);

router.post("/athletes", createAthlete);

router.put("/athletes/:id", updateAthlete);

router.delete("/athletes/:id", deleteAthlete);

export default router;