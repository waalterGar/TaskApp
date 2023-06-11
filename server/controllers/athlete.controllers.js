import { pool } from "../db.js";
import { formatDate } from "../utils.js";

export const getAthletes = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM athlete"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAthlete = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT a.id, a.name, a.email, a.phone_num, a.birth_date, a.gender, a.height, a.weight, t.email as trainer_email, d.email as dietitian_email FROM athlete AS a LEFT JOIN trainer AS t ON t.trainer_id = a.trainer_id LEFT JOIN dietitian AS d ON d.dietitian_id = a.dietitian_id WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      res.status(404).json({ message: "athlete not found" });
    }

    result[0].birth_date = formatDate(result[0].birth_date);
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAthlete = async (req, res) => {
  try {
    const { name, email, password, birth_date, gender, height, weight,  trainer_id, dietitian_id } = req.body;
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

export const updateAthlete = async (req, res) => {
  try {
    const result = await pool.query("UPDATE athlete SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAthlete = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM athlete WHERE id = ?", [
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