import { pool } from "../db.js";

export const getMealRecords = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM meal_record"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMealRecord = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT record.*, meal.name as meal_name FROM meal_record as record JOIN meal ON meal.id_meal=record.meal_id WHERE record.id_meal_record = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "meal record not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createMealRecord = async (req, res) => {
  try {
    console.log(req.body);
    const { date, quantity, eaten, meal_id, nutritional_plan_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO meal_record (date, quantity, eaten, meal_id, nutritional_plan_id ) VALUES (?, ?, ?, ?, ?)",
      [date, quantity, eaten, meal_id, nutritional_plan_id]
    );
    console.log(result);
    res.json({
      id: result.insertId,
        quantity,
        eaten,
        meal_id,
        nutritional_plan_id
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMealRecord = async (req, res) => {
  try {
    const result = await pool.query("UPDATE meal_record SET quantity = ?, date = ? WHERE id_meal_record = ?", [
      req.body.quantity,
      req.body.date,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMealRecord = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM meal_record WHERE id_meal_record = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "meal record not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};