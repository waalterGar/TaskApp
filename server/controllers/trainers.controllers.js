import { pool } from "../db.js";
import  bcrypt  from 'bcryptjs'
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

//import all validations from "../validations/validations.js"
import { validateId, validateRoutine, validateSession, validateExercise, validateTrainer, validateMeal } from "../validation/validation.js";

const createToken = (id) => {
  console.log("createToken", id);
  try {
    return jwt.sign({ id: id }, SECRET, { expiresIn: 60 * 60 });
  } catch (error) {
    console.log(error);
  }
};

function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = "" + d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [day, month, year].join("-");
}

function formatDateToMysql(date) {

  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = "" + d.getFullYear();
  let hour = "" + d.getHours();
  let minutes = "" + d.getMinutes();
  let seconds = "" + d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hour.length < 2) hour = "0" + hour;
  if (minutes.length < 2) minutes = "0" + minutes;
  if (seconds.length < 2) seconds = "0" + seconds;

  return [year, month, day].join("-") + " " + [hour, minutes, seconds].join(":");
}


export const getTrainers = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM trainer"
    );
    if (result.length === 0) {
      res.status(404).json({ message: "trainers not found" });
      return;
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTrainerExercises = async (req, res) => {
  console.log("getTrainerExercises", req.params);
  //validateid and return if invalid
  try {
    const [result] = await pool.query(
      "SELECT * FROM exercise WHERE trainer_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      res.status(404).json({ message: "exercises not found" });
      return;
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTrainer = async (req, res) => {
  const  error  = validateId(req.params.id);
  if (error) return res.status(400).json(error);
  try {
    const [result] = await pool.query("SELECT * FROM trainer WHERE trainer_id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "trainer not found" });
      return;
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAthletes = async (req, res) => {
  console.log("getAthletes", req.headers.authorization);
  const  error  = validateId(req.params.id);
  if (error) return res.status(400).json(error);

  try {
    const [result] = await pool.query(
      "SELECT a.id, a.name, a.email, a.phone_num, a.birth_date, a.gender, a.height, a.weight, np.id_nutritional_plan, np.name as nutritional_plan_name, r.name as routine_name, r.id_routine FROM athlete as a LEFT JOIN nutritional_plan as np ON a.id = np.athlete_id LEFT JOIN routine AS r ON a.id = r.athlete_id WHERE a.trainer_id = ?",[
        req.params.id,
      ]);
      if (result.length === 0) {
        res.status(404).json({ message: "athletes not found" });
        return;
      }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSessions = async (req, res) => {
  const  error  = validateId(req.params.id);
  if (error) return res.status(400).json(error);

  try {
    const [result] = await pool.query("SELECT s.id_training_session,  s.name, s.description, s.session_date, s.trainer_notes, r.athlete_id FROM training_session AS s JOIN routine AS r ON  s.routine_id = r.id_routine WHERE r.athlete_id = ?;", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "session not found" });
      return;
    }

    result.forEach((element) => {
      element.session_date = formatDate(element.session_date);
    });
 
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSession = async (req, res) => {
  console.log("getSession", req.params.id);
  const  error  = validateId(req.params.id);
  if (error) return res.status(400).json(error);
  try {
    const [result] = await pool.query("SELECT * FROM training_session WHERE id_training_session = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "training session not found" });
      return;
    }
    
    result[0].session_date = formatDate(result[0].session_date);

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//function to group by property
function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}
export const getExecutions = async (req, res) => {
  const  error  = validateId(req.params.id);
  if (error) return res.status(400).json(error);
  try {
    const [result] = await pool.query("SELECT execution.*, exercise.id_exercise as id_exercise, exercise.name AS exercise_name FROM execution JOIN exercise ON execution.exercise_id = exercise.id_exercise WHERE execution.training_session_id = ? ;", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "execution not found" });
      return;
    }
    res.json(groupBy(result, "exercise_name"));
  
   } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAthleteMealRecords = async (req, res) => { 
  const  error  = validateId(req.params.athleteId);
  if (error) return res.status(400).json(error);
  try {
    const [result] = await pool.query("SELECT meal_record.*, meal.name AS meal_name, nutritional_plan.dietitian_id, nutritional_plan.athlete_id FROM meal_record JOIN meal ON meal_record.meal_id = meal.id_meal JOIN nutritional_plan ON meal_record.nutritional_plan_id =nutritional_plan.id_nutritional_plan WHERE nutritional_plan.athlete_id = ?;", [
      req.params.athleteId,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "athlete not found" });
      return;
    }

    result.forEach((element) => {
      element.date = formatDate(element.date);
      
    });
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProgression = async (req, res) => {
  const idAthleteError = validateId(req.params.idAthlete);
  if ( idAthleteError) return res.status(400).json(idAthleteError);

  const  exerciseIdError  = validateId(req.params.exerciseId);
  if (exerciseIdError ) return res.status(400).json(exerciseIdError);
  
  try {
    const [result] = await pool.query("SELECT execution.*, exercise.name AS exercise_name, training_session.session_date AS date, routine.athlete_id FROM execution JOIN exercise ON execution.exercise_id = exercise.id_exercise JOIN training_session on execution.training_session_id = training_session.id_training_session  JOIN routine ON training_session.routine_id = routine.id_routine WHERE execution.exercise_id = ? AND routine.athlete_id = ? ORDER BY training_session.session_date DESC;", [
      req.params.exerciseId,
      req.params.idAthlete
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "execution not found"});
      return;
    }

    result.forEach((element) => {
      element.date = formatDate(element.date);
    });

    //group by date
    res.json(groupBy(result, "date"));
   
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getExercise = async (req, res) => {
  const  error  = validateId(req.params.id);
  if (error) return res.status(400).json(error);
  try {
    const [result] = await pool.query("SELECT * FROM exercise WHERE id_exercise = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "exercise not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTrainer = async (req, res) => {
  try {
    const { name, email, password, birth_date, gender } = req.body;
    const [result] = await pool.query(
      "INSERT INTO trainer (name, email, password, birth_date, gender) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, birth_date, gender]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      name
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTrainerAthlete = async (req, res) => {

  let athlete = {...req.body};
  athlete.trainer_id = req.params.id;

  try {
    let athlete = {...req.body};
    athlete.trainer_id = req.params.id;
    const { name, email, password, birth_date, gender, height, weight,  trainer_id, dietitian_id } = athlete;
    const [result] = await pool.query(
      "INSERT INTO athlete (name, email, password, birth_date, gender, height, weight, trainer_id, dietitian_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, email, password, birth_date, gender, height, weight,  trainer_id, dietitian_id]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      name
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRoutine = async (req, res) => {
  let routine = {...req.body};
    routine.trainer_id = req.params.id;
    routine.athlete_id = req.params.athleteId;
  
  const  routineError  = validateRoutine(routine);
  if (routineError) return res.status(400).json(routineError);
  
  try {
    const { name, description, trainer_id, athlete_id} = routine;
    const [result] = await pool.query(
      "INSERT INTO routine (name, description, trainer_id, athlete_id) VALUES (?, ?, ?, ?)",
      [name, description, trainer_id, athlete_id]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      name,
      trainer_id: result.trainer_id,
      athlete_id: result.athlete_id
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSession = async (req, res) => {
  console.log(req.body);
  try {
    let session = {...req.body};
    
  
    session.routine_id = parseInt(session.routine_id);
    session.session_date = formatDateToMysql(session.session_date);

    console.log(session);

    const { name, description, session_date, trainer_notes, routine_id} = session;

    const [result] = await pool.query(
      "INSERT INTO training_session (name, description, session_date, trainer_notes, routine_id) VALUES (?, ?, ?, ?, ?)",
      [name, description, session_date, trainer_notes, routine_id]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      name
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createExercise = async (req, res) => {
  try {
    console.log("createExercise",req.body);
    const { name, description, muscle_group, trainer_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO exercise (name, description, muscle_group, trainer_id) VALUES (?, ?, ?, ?)",
      [name, description, muscle_group, trainer_id]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      name
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createExecution = async (req, res) => {
  try {
    console.log(req.body);
    const { num_set, repetitions, weight, rpe, rir, done, training_session_id, exercise_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO execution (num_set, repetitions, weight, rpe, rir, done, training_session_id, exercise_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [num_set,repetitions, weight, rpe, rir, done, training_session_id, exercise_id]
    );
    console.log(result);
    res.json({
      id: result.insertId,
        num_set,
        done,
        exercise_id
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createMeal = async (req, res) => {
  const mealError = validateMeal(req.body);

  try {
    const { name, description, recipe, calories, protein, carbohydrates, fat, dietitian_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO meal (name, description, recipe, calories, protein, carbohydrates, fat, dietitian_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, description, recipe, calories, protein, carbohydrates, fat, dietitian_id]
    );
    console.log(result);
    res.json({
      id: result.insertId,
        name, 
        description,  
        dietitian_id
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addTrainerAthlete = async (req, res) => {
  try {
    console.log(req.params);  
    const result = await pool.query("UPDATE athlete SET trainer_id = ? WHERE id = ?", [
      req.params.idTrainer,
      req.params.id
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const trainerLogin = async (req, res) => {
  try {
    console.log("trainer:", req.body);
    const { email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 8);
    const result = await pool.query(
      "SELECT trainer_id, name, password FROM trainer WHERE email = ?",
      [email, hashedPassword]
    );
    console.log("result:", result[0][0]);

    if (result[0].length > 0 && (await bcrypt.compare(password, result[0][0].password))) {
      console.log("LOGGED");
      console.log("loged id:", result[0][0].trainer_id);

      const token = createToken(result[0][0].trainer_id);
      console.log("token:", token);

      const { trainer_id: id, name } = result[0][0];
      console.log(result[0][0]);


      res.status(202).json({ id, name, email, token, role: "trainer" });
      return;
    } else {
      console.log("NOT LOGGED");
      res.status(404).json({ message: "User not found" });
      return;
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const trainerRegister = async (req, res) => {
  console.log("trainer Register:", req.body);
  try {
    console.log("trainer Register:", req.body);
    const { name, email, password, phone_num, birth_date, gender } = req.body;
    let hashedPassword = await bcrypt.hash(password, 8);

    const [result] = await pool.query("INSERT INTO trainer(name, email, password, phone_num, birth_date, gender) VALUES (?, ?, ?, ?, ?, ?)", [
      name,
      email,
      hashedPassword,
      phone_num,
      birth_date,
      gender
    ]);
    console.log(result);
    res.json({
      id: result.insertId,
      name,
      email,
      birth_date 
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
    


export const deleteTrainerAthlete = async (req, res) => {
  try {
    const result = await pool.query("UPDATE athlete SET trainer_id = NULL WHERE id = ? AND trainer_id = ?", [
      req.params.id,
      req.params.idTrainer
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTrainer = async (req, res) => {
  const idError = validateId(req.params.id);
  if (idError) return res.status(400).json(idError);
  const trainerError = validateTrainer(req.body);
  try {
    const result = await pool.query("UPDATE trainer SET ? WHERE trainer_id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSession = async (req, res) => {
  console.log("updateSession:", req.body);

  try {
    const result = await pool.query("UPDATE training_session SET name = ?, description = ?, session_date = ?, trainer_notes = ?  WHERE id_training_session = ?", [
      req.body.name,
      req.body.description,
      formatDateToMysql(req.body.session_date),
      req.body.trainer_notes,
      req.params.sessionId,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateExercise = async (req, res) => {
  console.log("updateExercise:", req.body);
  try {
    const result = await pool.query("UPDATE exercise SET ? WHERE id_exercise = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMeal = async (req, res) => {
  try {
    console.log("updateMeal req body:", req.body);
    const result = await pool.query("UPDATE meal SET ? WHERE id_meal = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTrainer = async (req, res) => {
  const idError = validateId(req.params.id);
  if (idError) return res.status(400).json(idError);

  try {
    const [result] = await pool.query("DELETE FROM trainer WHERE trainer_id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "trainer not found" });
      return;
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteRoutine = async (req, res) => {
  const routineIdError = validateId(req.params.routineId);
  if (routineIdError) return res.status(400).json(idError);

  const idError = validateId(req.params.id);
  if (idError) return res.status(400).json(idError);

  const athleteIdError = validateId(req.params.athleteIdError);
  if (athleteIdError) return res.status(400).json(idError);

  try {
    const [result] = await pool.query("DELETE FROM routine WHERE id_routine = ? and trainer_id = ? and athlete_id = ?", 
    [req.params.routineId, req.params.id, req.params.athleteId]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "routine not found" });
      return;
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSession= async (req, res) => {
  const sessionIdError = validateId(req.params.sessionId);
  if (sessionIdError) return res.status(400).json(sessionIdError);
  
  try {
    const [result] = await pool.query("DELETE FROM training_session WHERE id_training_session = ?", [
      req.params.sessionId,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "training session not found" });
      return;
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteExercise = async (req, res) => {
  const idError = validateId(req.params.id);
  if (idError) return res.status(400).json(idError);
  try {
    const [result] = await pool.query("DELETE FROM exercise WHERE id_exercise = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "exercise not found" });
      return;
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMeal = async (req, res) => {
  const idError = validateId(req.params.id);
  if (idError) return res.status(400).json(idError);
  
  try {
    const [result] = await pool.query("DELETE FROM meal WHERE id_meal = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "meal not found" });
      return;
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

