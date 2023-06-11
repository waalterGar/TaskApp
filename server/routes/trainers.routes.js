import { Router } from 'express';
import { getTrainers, getTrainer, getAthletes, createTrainer, 
    updateTrainer, deleteTrainer, createTrainerAthlete, 
    createRoutine, deleteRoutine,
    createSession, updateSession, deleteSession,
    getExecutions, getAthleteMealRecords, getProgression, 
    getSessions, getTrainerExercises, getSession, getExercise, 
    createExercise, updateExercise, deleteExercise, createExecution, 
    addTrainerAthlete, deleteTrainerAthlete, createMeal, 
    updateMeal, deleteMeal, trainerLogin, trainerRegister} from "../controllers/trainers.controllers.js";

const router = Router();

//-------------------GET-------------------//

router.get("/trainers", getTrainers);

router.get("/trainers/:id", getTrainer);

router.get("/trainers/:id/athletes", getAthletes);

router.get("/athletes/:id/sessions", getSessions);

router.get("/sessions/:id", getSession);

router.get("/sessions/:id/executions", getExecutions);

router.get("/athletes/:idAthlete/exercises/:exerciseId/progression", getProgression);

router.get("/exercises/:id", getExercise);

router.get("/trainers/:id/exercises", getTrainerExercises);

router.get("/athletes/:athleteId/mealRecords", getAthleteMealRecords);

//-------------------POST-------------------//
router.post("/trainers", createTrainer);

router.post("/trainers/", createTrainer);

router.post("/trainers/:id/athletes", createTrainerAthlete);

router.post("/trainers/:id/athletes/:athleteId/routines", createRoutine);

router.post("/sessions", createSession)

router.post("/exercises", createExercise);

router.post("/executions", createExecution);

router.post("/meals", createMeal);

router.post("/trainer/login", trainerLogin);

router.post("/trainer/register", trainerRegister);
//-------------------PUT-------------------//
router.put("/trainers/:id", updateTrainer);

router.put("/sessions/:sessionId", updateSession);

router.put("/exercises/:id", updateExercise);

router.put("/athletes/:id/trainers/:idTrainer/new", addTrainerAthlete);

router.put("/athletes/:id/trainers/:idTrainer/delete", deleteTrainerAthlete);

router.put("/meals/:id", updateMeal);
//------------------DELETE-------------------//
router.delete("/trainers/:id", deleteTrainer);

router.delete("/trainers/:id/athletes/:athleteId/routines/:routineId", deleteRoutine);

router.delete("/sessions/:sessionId", deleteSession);

router.delete("/exercises/:id", deleteExercise);

router.delete("/meals/:id", deleteMeal);

export default router;