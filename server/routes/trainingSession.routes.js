import { Router } from 'express';
import {getSessions, getSession, createSession, updateSession, deleteSession} from "../controllers/trainingSession.controllers.js";

const router = Router();

router.get("/sessions", getSessions);

router.get("/sessions/:id", getSession);

//router.post("/sessions", createSession);


router.delete("/sessions/:id", deleteSession);

export default router;