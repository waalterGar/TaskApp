import { pool } from "../db.js";
import { formatDate } from "../utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { createToken } from "../utils.js";

export const getAthletes = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM athlete"
    );
    res.json(result);
    return;
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
      returnM
    }

    result[0].birth_date = formatDate(result[0].birth_date);
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const athleteLogin = async (req, res) => {
  try {
    console.log("athlete:", req.body);
    const { email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 8);
    const result = await pool.query(
      "SELECT id, name, password FROM athlete WHERE email = ?",
      [email, hashedPassword]
    );

    if (result[0].length > 0 && (await bcrypt.compare(password, result[0][0].password))) {
      console.log("LOGGED");
      console.log("loged id:", result[0][0].id);

      const token = createToken(result[0][0].id);
      const id = result[0][0].id;
      console.log("token:", token);

      res.status(202).json({ id, email, token });
      return
    } else {
      console.log("NOT LOGGED");
      res.status(404).json({ message: "User not found" });
      return;
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAthlete = async (req, res) => {
  /*parse req.body with following format:createAthlete: { name: 'nameee', email: 'email', password: 'passwor',phone: '55168',birth_date: '10-10-2020',gender: 'gender',weight: 'gdhh',height: 'dcc'*/

  console.log("createAthlete:", req.body);
  try {
    const { name, email, password, birth_date, gender, height, weight} = req.body;
    let hashedPassword = await bcrypt.hash(password, 8);
    const [result] = await pool.query(
      "INSERT INTO athlete (name, email, password, birth_date, gender, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, birth_date, gender, height, weight]
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
    return res.sendStatus(204).json({ message: "athlete updated" });
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