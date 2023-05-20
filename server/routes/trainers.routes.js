import { Router } from 'express';
import { getTrainers, getTrainer, getAthletes, createTrainer, 
    updateTrainer, deleteTrainer, createTrainerAthlete, 
    deleteTrainerAthlete, createRoutine, deleteRoutine,
    createSession, updateSession, deleteSession,
    getExecutions, getAthleteMealRecords, getProgression, getSessions, getTrainerExercises, getSession} from "../controllers/trainers.controllers.js";

const router = Router();

//-------------------GET-------------------//

router.get("/trainers", getTrainers);

router.get("/trainers/:id", getTrainer);

router.get("/trainers/:id/athletes", getAthletes);

router.get("/athletes/:id/sessions", getSessions);

router.get("/sessions/:id", getSession);

router.get("/sessions/:id/executions", getExecutions);

router.get("/athletes/:idAthlete/exercises/:exerciseId/progression", getProgression);


router.get("/trainers/:id/exercises", getTrainerExercises);

router.get("/athletes/:athleteId/mealRecords", getAthleteMealRecords);

//-------------------POST-------------------//
router.post("/trainers", createTrainer);

router.post("/trainers/", createTrainer);

router.post("/trainers/:id/athletes", createTrainerAthlete);

router.post("/trainers/:id/athletes/:athleteId/routines", createRoutine);

router.post("/routines/:routineId/sessions", createSession)
//-------------------PUT-------------------//
router.put("/trainers/:id", updateTrainer);

router.put("/routines/:routineId/sessions/:sessionId", updateSession);

//------------------DELETE-------------------//
router.delete("/trainers/:id", deleteTrainer);

router.delete("/trainers/:id/athletes/:athleteId", deleteTrainerAthlete);

router.delete("/trainers/:id/athletes/:athleteId/routines/:routineId", deleteRoutine);

router.delete("/routines/:routineId/sessions/:sessionId/", deleteSession);

export default router;