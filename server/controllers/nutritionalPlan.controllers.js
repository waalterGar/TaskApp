import { pool } from "../db.js";

export const getPlans = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM nutritional_plan"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPlan = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM nutritional_plan WHERE id_nutritional_plan = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "nutritional plan not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPlan = async (req, res) => {
  try {
    const { name, description, start_date, end_date, dietitian_id, athlete_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO nutritional_plan (name, description, start_date, end_date, dietitian_id, athlete_id) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, start_date, end_date, dietitian_id, athlete_id]
      );
    console.log(result);
    res.json({
      id: result.insertId,
        name,
        description,
        dietitian_id,
        athlete_id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const result = await pool.query("UPDATE nutritional_plan SET ? WHERE id_nutritional_plan = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM nutritional_plan WHERE id_nutritional_plan = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "nutritional plan not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};