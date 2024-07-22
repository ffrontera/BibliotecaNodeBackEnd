import pool from '../db/db.js';
import { unlinkSync } from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const index = async (req, res) => {
    const sql = `SELECT libros.id, libros.titulo, libros.genero, libros.tapa, libros.resumen, libros.ISBN,
    autores.nombre AS nombre
    FROM libros 
    JOIN autores ON libros.id_autor = autores.id
    ORDER BY libros.titulo`;
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
};

const showByTitle = async (req, res) => {
    const { titulo } = req.params;
    const sql = `SELECT libros.id, libros.titulo, libros.genero, libros.tapa, libros.resumen, libros.ISBN,
    autores.nombre AS nombre
    FROM libros 
    JOIN autores ON libros.id_autor = autores.id 
    WHERE titulo LIKE "%"?"%"`;
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [titulo.trim().replaceAll('%20', ' ')]);
        res.status(200).json(rows);
    } catch (error) {

    }
};

const showById = async (req, res) => {
    const { idSearch } = req.params;
    const sql = `SELECT libros.id, libros.titulo, libros.genero, libros.tapa, libros.resumen, libros.ISBN,
    autores.nombre AS nombre
    FROM libros 
    JOIN autores ON libros.id_autor = autores.id 
    WHERE libros.id = ?`;
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [idSearch]);
        res.status(200).json(rows);
    } catch (error) {

    }
};

const showByISBN = async (req, res) => {
    const { ISBN } = req.params;
    const sql = `SELECT libros.id, libros.titulo, libros.genero, libros.tapa, libros.resumen, libros.ISBN,
    autores.nombre AS nombre
    FROM libros 
    JOIN autores ON libros.id_autor = autores.id 
    WHERE ISBN LIKE "%"?"%"`;
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [ISBN]);
        res.status(200).json(rows);
    } catch (error) {

    }
};

const showByAuthor = async (req, res) => {
    const { author } = req.params;
    const sql = `SELECT libros.id, libros.titulo, libros.genero, libros.tapa, libros.resumen, libros.ISBN,
    autores.nombre AS nombre
    FROM libros 
    JOIN autores ON libros.id_autor = autores.id 
    WHERE nombre LIKE "%"?"%"`;
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [author]);
        res.status(200).json(rows);
    } catch (error) {

    }
};

const showByGender = async (req, res) => {
    const { ISBN } = req.params;
    const sql = `SELECT libros.id, libros.titulo, libros.genero, libros.tapa, libros.resumen, libros.ISBN,
    autores.nombre AS nombre
    FROM libros 
    JOIN autores ON libros.id_autor = autores.id 
    WHERE ISBN LIKE "%"?"%"`;
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [ISBN]);
        res.status(200).json(rows);
    } catch (error) {

    }
};

const store = async (req, res) => {
    const { filename } = req.file;
    const { titulo, id_autor, genero, resumen, ISBN } = req.body;
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    const tapa = '../uploads/' + filename;
    const sql = 'INSERT INTO libros (titulo, id_autor, genero, tapa, resumen, ISBN) VALUES (?, ?, ?, ?, ?, ?)';
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [titulo, id_autor, genero, tapa, resumen, ISBN]);
        const book = { ...req.body, id: rows.insertId, tapa: tapa };
        res.status(201).json(book);
    } catch (error) {
        if( error.errno === 1062) {
           return res.status(418).json({ message: 'No se puede creaar, titulo duplicado' });
        }
        console.log(error);
        unlinkSync(path.join(__dirname, '../../public/uploads', filename));
        res.status(500).json({ error: "Ocurrió un problema, intente mas tarde" });
    }
};

//put libro
const update = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    console.log(req.body)
    const { id } = req.params;
    const { titulo, id_autor, genero, resumen, ISBN } = req.body;
    
    //TODO: hacer busqueda de autor_id desde el nombre para pasar a la query, si no existe agregar autor!
    const sql = "UPDATE libros SET titulo = ?, id_autor = ?, genero = ?, resumen = ?, ISBN = ? WHERE id = ?";
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [titulo, id_autor, genero,resumen, ISBN, id]);
        res.json({ message: "Libro actualizado correctamente" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    const sqlFind = 'SELECT tapa FROM libros WHERE id = ?'
    const sqlDelete = 'DELETE FROM libros WHERE id = ?';
    try {
        const connection = await pool.getConnection();
        const [book] = await connection.query(sqlFind, [id]);
        if (book.length === 0)
            return res.status(404).json({ message: 'No existe libro con ese id' });
        const [rows] = await connection.query(sqlDelete, [id]);
        const tapa = book[0].tapa.replace('../uploads/', '');
        unlinkSync(path.join(__dirname,  '../../public/uploads' , tapa));
        res.json({ message: 'Libro borrado ' });  
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ocurrió un problema, intente mas tarde' });
    }


};

export {
    index,
    showByTitle,
    showById,
    showByISBN,
    showByAuthor,
    showByGender,
    store,
    update,
    destroy
};