import pool from "../db/db.js";

const getBookCopies = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    const id_libro = req.params;

    const sql = 'SELECT * FROM ejemplares WHERE id_libro = ?';

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id_libro]);
        connection.release()
        res.status(200).json(rows);
    } catch (error){
        res.json({ message: error})
    }
};

const createCopyBook = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    const avaible = true;
    const { idBook, publisher, yearEdition, condition } = req.body;

    const sql = `INSERT INTO ejemplares (id_libro, editorial, anio_edicion, estado, en_biblioteca)
    VALUES ( ?, ?, ?, ?, ?)`;
    try {
        const connection = await pool.getConnection();
        const [row] = await connection.query(sql, [idBook, publisher, yearEdition, condition, avaible]);
        connection.release()
        const copy = { ...req.body, id: row.insertId}
        res.status(201).json(copy);
    } catch (error){
        res.json({ message: error})
    }
};

const updateCopyBook = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    const {id} = req.params;
    const { idBook, publisher, yearEdition, condition, avaible } = req.body;

    const sql = "UPDATE ejemplares SET id_libro = ?, editorial = ?, anio_edicion = ?, estado = ?, en_biblioteca = ? WHERE id = ?";
    try {
        const connection = await pool.getConnection();
        const [row] = await connection.query(sql, [idBook, publisher, yearEdition, condition, avaible, id]);
        connection.release()
        const copy = { ...req.body, ...req.params };
        res.status(201).json(copy);
    } catch (error){
        res.json({ message: error})
    }
};


const destroyCopyBook = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' })
    }
    const {id} = req.params;

    const sql = "DELETE FROM ejemplares WHERE id = ?";
    
    try {
        const connection = await pool.getConnection();
        const row = connection.query(sql, [ id ]);
        connection.release()
        res.json({ message: 'copy successfully removed' });
    } catch (error){
        res.json({ message: error})
    }
};

export {
    getBookCopies,
    updateCopyBook,
    destroyCopyBook,
    createCopyBook
}