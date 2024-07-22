import pool from "../db/db.js";

const showAllAuthors = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    const sql = `SELECT * FROM autores
    ORDER BY nombre`;
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql);
        res.status(200).json(rows);
    } catch (error){
        console.log(error);
        res.status(500).json({ error: error });
    }
};

const showAuthor = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    const { id } = req.params;

    const sql = 'SELECT * FROM autores WHERE id = ?';
    try {
        const connection = await pool.getConnection()
        const [row] = await connection.query(sql, [ id ]);
        res.status(200).json(row[0]);
    } catch (error){
        res.json({ message: error})
    }
};

const searchAuthorByName = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    const { name } = req.params;

    const sql = 'SELECT * FROM autores WHERE nombre LIKE "%"?"%"';
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [ name.trim().replaceAll('%20', ' ') ]);
        res.status(200).json(rows);
    } catch (error){
        res.json({ message: error})
    }
};

const createAuthor = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    const { name } = req.params;

    const sql = 'INSERT INTO autores (nombre) VALUE (?)';
    try {
        const connection = await pool.getConnection();
        const [row] = await connection.query(sql, [ name.replaceAll('%20', ' ') ]);
        res.status(201).json({ id: row.insertId, nombre: name });
    } catch (error){
        res.json({ message: error})
    }
};

const updateAuthor = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    const [ id, nombre ] = req.body;

    const sql = `UPDATE autores SET nombre = ?
    WHERE id = ?`;
    try {
        const connection = await pool.getConnection();
        const [row] = await connection.query(sql, [ nombre, id ]);
        res.status(200).json({ id, nombre: nombre });
    } catch (error){
        res.json({ message: error})
    }
};

const destroyAuthor = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    const { id } = req.params;

    const sql = 'DELETE FROM autores WHERE id = ?';
    try {
        const connection = await pool.getConnection();
        await connection.query(sql, [ id ]);
        res.status(200).json({ message: "Autor eliminado correctamente."});
    } catch (error){
        res.json({ message: error})
    }
};

export {
    showAllAuthors,
    showAuthor,
    searchAuthorByName,
    createAuthor,
    updateAuthor,
    destroyAuthor
};