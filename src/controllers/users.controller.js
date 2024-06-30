import pool from '../db/db.js';

const show = (req, res) => {
    const {  } = req.params;

    const sql = 'SELECT * FROM usuarios WHERE = ?';
    pool.query(sql, [] ,(error, rows) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'intente mas tarde'});
        }

        if (rows.length == 0) {
            return res.status(404).json({ mensaje: 'no existe el usuario'})
        }
        res.json(rows[0]);
    })
};

const store = (req, res) => { 

};

const update = (req, res) => {

};

const destroy = (req, res) => {

};

export {
    show,
    store,
    update,
    destroy
};