const db = require('../db/db');

//get lista libros
const index = (req, res) => {
    const sql = 'SELECT * FROM libros';
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: 'Ocurrió un problema, intente mas tarde'})
        }
        res.json(rows);
    })
};

//get libro
const show = (req, res) => {

};

//post libro
const store = (req, res) => {

};

//put libro
const update = (req, res) => {

};

//delete libro
const destroy = (req, res) => {

};

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};