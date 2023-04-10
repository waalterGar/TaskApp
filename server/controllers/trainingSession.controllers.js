import { pool } from "../db.js";

export const getSessions = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM training_session"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM training_session WHERE id_training_session = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "training session not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSession = async (req, res) => {
  try {
    const { name, description, session_date, trainer_notes, routine_id} = req.body;
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

export const updateSession = async (req, res) => {
  try {
    const result = await pool.query("UPDATE training_session SET ? WHERE id_training_session = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSession= async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM training_session WHERE id_training_session = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "training session not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};