import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
import { pool } from "../db.js";

const getDietitian = async(id) => {
    try {
        const [dietitian] = await pool.query("SELECT dietitian_id FROM dietitian WHERE dietitian_id = ?", [id]);
        return dietitian[0].dietitian_id;
    } catch (error) {
        console.log(error);
    }
}

const requireAuth = async(req, res, next) => {
    const { authorization } = req.headers;
    console.log("inside auth", authorization);

    if (!authorization) {
        return res.status(401).json({ error: 'You must be logged in.' });
    }
    const token = authorization.split(' ')[1];
    console.log("token", token);

    try {
        const {id}= jwt.verify(token, SECRET);
        console.log("token id", id);

        req.user = await getDietitian(id);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'not Authoriized' });
        return;
    }
}

export default requireAuth;
