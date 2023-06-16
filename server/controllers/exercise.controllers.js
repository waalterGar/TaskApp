import { pool } from "../db.js";

export const getExercises = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM exercise"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getExercise = async (req, res) => {
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

export const createExercise = async (req, res) => {
  try {
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

export const updateExercise = async (req, res) => {
  console.log(req.body);
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

export const deleteExercise = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM exercise WHERE id_exercise = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "exercise not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};