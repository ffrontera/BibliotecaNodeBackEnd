
const db = require('../db/db');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../models/user.model");
const register = (req, res) => {
  const { nombre, apellido, mail, pssword, tel } = req.body;

  const hash = bcrypt.hashSync(pssword, 8);
  const rol = 'socio';
  const sql = 'INSERT INTO users (nombre, apellido, mail, pssword , tel , rol) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [nombre, apellido, mail, hash, tel, rol], (error, rows) => {
    if (error) {
      res.status(418).json({ 'err': 'ya existe usuario con ese mail.' });
    }
  });

  let user = db.query('select from users where mail = ?', [mail]);

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || '123456', {
    expiresIn: "1h",
  });

  res.status(201).json({ auth: true, token });
}

const login = (req, res) => {

  const { mail, pssword } = req.body;
  const sql = "SELECT * FROM users WHERE mail = ?";
  db.query(sql, [mail], (error, rows) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Intente mas tarde" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = rows[0];
    const valid = bcrypt.compareSync(pssword, user.pssword);
    if (!valid) {
      return res.status(401).json({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.id, admin: user.rol === 'admin' }, process.env.SECRET_KEY || '123456', {
      expiresIn: "1h",
    });

    res.json({ auth: true, token });

  })
};

module.exports = {
  register,
  login
}