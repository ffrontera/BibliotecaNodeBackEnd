import pool from '../db/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const { nombre, apellido, mail, pssword, tel } = req.body;
    if (nombre == '' || apellido == '' || mail == '' || pssword == '' || tel == '')
        res.status(418).json({ 'error': 'debe completar todos los campos' })
    const rol = 'socio';
    const user = req.body;
    user.pssword = bcrypt.hashSync(pssword, 8);
    user.rol = rol;
    const sql = 'INSERT INTO users SET ?'; //{ nombre: nombre, apellido: apellido, mail: mail, tel: tel, pswword: hash, rol: rol }
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [user]);
        let newUser = await connection.query('select * from users where mail = ?', [mail]);
        // connection.release();
        const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
        res.status(201).json({ auth: true, token, message: 'bienvenido ' + user.nombre, isAdmin: user.rol === "admin", id: user.id });
    } catch (error) {
        if (error.errno == 1062)
            res.status(400).json({ message: 'Error, el e-mail ya se encuentra registrado' });
        else
            res.sendStatus(500);
    }
};

export const login = async (req, res) => {

    const { mail, pssword } = req.body;
    const sql = "SELECT * FROM users WHERE mail = ?";
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [mail]);
        const user = rows[0];
        const valid = bcrypt.compareSync(pssword, user.pssword);
        if (!valid) {
            return res.status(401).json({ auth: false, token: null, message: 'Incorrect password' });
        }
        const token = jwt.sign({ id: user.id, admin: user.rol === 'admin' }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
        let id = user.id;
        res.json({ auth: true, token, message: 'bienvenido ' + user.nombre, isAdmin: user.rol === "admin", id: id });
    } catch (error) {
        if (error) {
            return res.status(500).json({ 'message': "Intente mas tarde" });
        }
        if (rows.length === 0) {
            return res.status(404).json({ 'message': "User not found" });
        }
    } 
};