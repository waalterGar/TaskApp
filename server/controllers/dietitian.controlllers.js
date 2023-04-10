import { pool } from "../db.js";

export const getDietitians = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM dietitian"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDietitian = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM dietitian WHERE dietitian_id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "dietitian not found" });
    }
    res.json(result[0]);
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
      name
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDietitian = async (req, res) => {
  try {
    const result = await pool.query("UPDATE dietitian SET ? WHERE dietitian_id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDietitian = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM dietitian WHERE dietitian_id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "dietitian not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};