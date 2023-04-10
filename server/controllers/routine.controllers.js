import { pool } from "../db.js";

export const getRoutines = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM routine"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRoutine = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM routine WHERE id_routine = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "routine not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRoutine = async (req, res) => {
  try {
    const { name, description, trainer_id, athlete_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO routine (name, description, trainer_id, athlete_id) VALUES (?, ?, ?, ?)",
      [name, description, trainer_id, athlete_id]
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

export const updateRoutine = async (req, res) => {
  try {
    const result = await pool.query("UPDATE routine SET ? WHERE id_routine = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteRoutine = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM routine WHERE id_routine = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "athlete not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};