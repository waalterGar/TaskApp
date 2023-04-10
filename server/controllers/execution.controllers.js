import { pool } from "../db.js";

export const getExecutions = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM execution"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getExecution = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM execution WHERE id_execution = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "execution not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createExecution = async (req, res) => {
  try {
    const { num_set, rpe, rir, done, training_session_id, exercise_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO execution (num_set, rpe, rir, done, training_session_id, exercise_id) VALUES (?, ?, ?, ?, ?, ?)",
      [num_set, rpe, rir, done, training_session_id, exercise_id]
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

export const updateExecution = async (req, res) => {
  try {
    const result = await pool.query("UPDATE execution SET ? WHERE id_execution = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteExecution = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM execution WHERE id_execution = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "execution not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};