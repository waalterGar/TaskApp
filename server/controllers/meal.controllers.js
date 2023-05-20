import { pool } from "../db.js";

export const getMeals = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM meal;"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMeal = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM meal WHERE id_meal = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "meal not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createMeal = async (req, res) => {
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

export const updateMeal = async (req, res) => {
  try {
    const result = await pool.query("UPDATE meal SET ? WHERE id_meal = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMeal = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM meal WHERE id_meal = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "meal not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};