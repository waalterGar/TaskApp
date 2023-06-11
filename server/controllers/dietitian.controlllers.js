import { pool } from "../db.js";
import bcrypt from "bcryptjs";

export const getDietitians = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM dietitian");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDietitian = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM dietitian WHERE dietitian_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      res.status(404).json({ message: "dietitian not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAthletes = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM athlete WHERE dietitian_id = ?",
      [req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAthlete = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT name, email, gender, height, weight, trainer_id, dietitian_id FROM athlete WHERE id = ? and dietitian_id = ?",
      [req.params.athleteId, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMeals = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT id_meal, name, description, recipe, calories, protein, carbohydrates, fat, dietitian_id FROM meal WHERE dietitian_id = ?",
      [req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMeal = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT id_meal, name, description, recipe, calories, protein, carbohydrates, fat FROM meal WHERE id_meal = ? and dietitian_id = ?",
      [req.params.mealId, req.params.dietitianId]
    );
    if (result.length === 0) {
      res.status(404).json({ message: "meal not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProgression = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT execution.*, exercise.name AS exercise_name FROM execution JOIN exercise ON execution.exercise_id = exercise.id_exercise WHERE execution.exercise_id = ? ;",
      [req.params.exerciseId]
    );
    if (result.length === 0) {
      res.status(404).json({ message: "execution not found" });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAthleteMealRecords = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT meal_record.*, meal.name AS meal_name, nutritional_plan.dietitian_id, nutritional_plan.athlete_id FROM meal_record JOIN meal ON meal_record.meal_id = meal.id_meal JOIN nutritional_plan ON meal_record.nutritional_plan_id =nutritional_plan.id_nutritional_plan WHERE nutritional_plan.athlete_id = ?;",
      [req.params.athleteId]
    );
    if (result.length === 0) {
      res.status(404).json({ message: "meal record not found" });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDietitian = async (req, res) => {
  try {
    const { name, email, password, birth_date, gender } = req.body;
    const [result] = await pool.query(
      "INSERT INTO dietitian (name, email, password, birth_date, gender) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, birth_date, gender]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      name,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNutritionalPlan = async (req, res) => {
  try {
    let plan = { ...req.body };
    plan.dietitian_id = req.params.dietitianId;
    plan.athlete_id = req.params.athleteId;

    const {
      name,
      description,
      start_date,
      end_date,
      dietitian_id,
      athlete_id,
    } = plan;
    const [result] = await pool.query(
      "INSERT INTO nutritional_plan (name, description, start_date, end_date, dietitian_id, athlete_id) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, start_date, end_date, dietitian_id, athlete_id]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      name,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addMealRecord = async (req, res) => {
  try {
    let mealRecord = { ...req.body };
    mealRecord.nutritional_plan_id = req.params.planId;

    const { date, quantity, eaten, meal_id, nutritional_plan_id } = mealRecord;
    const [result] = await pool.query(
      "INSERT INTO meal_record (date, quantity, eaten,  meal_id, nutritional_plan_id) VALUES (?,  ?, ?, ?, ?)",
      [date, quantity, eaten, meal_id, nutritional_plan_id]
    );
    console.log(result);
    res.json({
      id: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createMeal = async (req, res) => {
  try {
    let meal = { ...req.body };
    meal.dietitian_id = req.params.dietitianId;

    const {
      name,
      description,
      recipe,
      calories,
      protein,
      carbohydrates,
      fat,
      dietitian_id,
    } = meal;
    const [result] = await pool.query(
      "INSERT INTO meal (name, description, recipe, calories, protein, carbohydrates, fat, dietitian_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        description,
        recipe,
        calories,
        protein,
        carbohydrates,
        fat,
        dietitian_id,
      ]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      name,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const dietitianLogin = async (req, res) => {
  try {
    console.log("dietitian:", req.body);
    const { email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 8);
    const result = await pool.query(
      "SELECT name, password FROM dietitian WHERE email = ?",
      [email, hashedPassword]
    );
    
    if (result[0].length > 0 && await bcrypt.compare(password, result[0][0].password)) {
      req.session.loggedin = true;
      console.log("password match");
      res.json(result[0].name);
    } else {
      console.log("NOT LOGGED");
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const dietitianRegister = async (req, res) => {
  try {
    console.log("dietitian Register:", req.body);
    const { name, email, password, phone_num, birth_date, gender } = req.body;
    let hashedPassword = await bcrypt.hash(password, 8);

    const [result] = await pool.query(
      "INSERT INTO dietitian (name, email, password, phone_num, birth_date, gender) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phone_num, birth_date, gender]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      name,
      email,
      birth_date,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDietitian = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE dietitian SET ? WHERE dietitian_id = ?",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editMeal = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE meal SET name = ?, description = ?, recipe = ?, calories = ?, protein = ?, carbohydrates = ?, fat = ? WHERE id_meal = ? and dietitian_id = ?",
      [
        req.body.name,
        req.body.description,
        req.body.recipe,
        req.body.calories,
        req.body.protein,
        req.body.carbohydrates,
        req.body.fat,
        req.params.mealId,
        req.params.dietitianId,
      ]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editMealRecord = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE meal_record SET date = ?, quantity = ?, eaten = ? WHERE nutritional_plan_id = ? and id_meal_record = ?",
      [
        req.body.date,
        req.body.quantity,
        req.body.eaten,
        req.params.planId,
        req.params.mealRecordId,
      ]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addAthlete = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE athlete SET dietitian_id = ? WHERE id = ?",
      [req.params.dietitianId, req.params.athleteId]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAthlete = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE athlete SET dietitian_id = NULL WHERE dietitian_id = ? and id = ?",
      [req.params.dietitianId, req.params.athleteId]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDietitian = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM dietitian WHERE dietitian_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "dietitian not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMeal = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM meal WHERE dietitian_id = ? and id_meal = ?",
      [req.params.dietitianId, req.params.mealId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "meal not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMealRecord = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM meal_record WHERE nutritional_plan_id = ? and id_meal_record = ?",
      [req.params.planId, req.params.mealRecordId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "meal not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
