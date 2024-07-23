import pool from "../db/db.js";

const showLoan = async (req, res) => {
    // if(!req.isAdmin) {
    //     return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' });
    // }
    const { idPartner } = req.params;

    const sql = 'SELECT p.id, p.socio_id, p.id_ejemplar, p.fecha_inicio, p.fecha_fin, p.concluido, p.fecha_devolucion, l.tapa FROM prestamos p JOIN ejemplares e ON p.id_ejemplar = e.id JOIN libros l ON e.id_libro = l.id WHERE socio_id = ? ORDER BY id DESC';

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [ idPartner ]);
        connection.release()
        res.status(200).json(rows);
    } catch (error){
        res.json({ message: error})
    }
};

const createLoan = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' });
    }
    const { idPartner, idCopy } = req.body;
    const dateNow = new Date();
    const date = new Date();
    const expirationDate = new Date(dateNow.setMonth(dateNow.getMonth() + 2));
    const concluded = false;

    const sqlAvailable = 'SELECT en_biblioteca FROM ejemplares WHERE id = ?';
    const sqlWhitLoans = 'SELECT * FROM prestamos WHERE socio_id = ? AND concluido = 0';
    // const sqlWithoutDebt = '';
    const sql = 'INSERT INTO prestamos ( socio_id, id_ejemplar, fecha_inicio, fecha_fin, concluido) VALUES ( ?, ?, ?, ?, ?)';

    try {
        const connection = await pool.getConnection();
        const copyAvailable = await connection.query(sqlAvailable, [idCopy]);
        if (!copyAvailable[0][0].en_biblioteca) {
            connection.release();
            return res.json({ message: 'Ejemplar no disponible' });
        }
        const [userWhitLoans] = await connection.query(sqlWhitLoans, [idPartner]);
        if (userWhitLoans.length > 0) {
            connection.release();
            return res.json({ message: 'El socio tiene prestamos activos' });
        }
        //TODO: hacer query para saber si el socio  este al dia con las cuotas
        // const [userWithoutDebt] = await connection.query(sqlWithoutDebt, [idPartner]);
        // if (!userWithoutDebt) {
        //     connection.release();
        //     return res.json({ message: 'El socio no esta al dia con las cuotas' });
        // }
        const [row] = await connection.query(sql, [ idPartner, idCopy, date, expirationDate, concluded ]);
        const prestamo = {
            id: row.insertId,
            id_usuario: idPartner,
            ejemplar_id: idCopy,
            fecha_inicio: date,
            fecha_fin: expirationDate,
            concluido: concluded,
            fecha_devolucion: null
        };
        if(row.affectedRows != 0){
            const sqlUpdateCopy = 'UPDATE ejemplares SET en_biblioteca = 0 WHERE id = ?';
            connection.query(sqlUpdateCopy, [idCopy]);
        }
        connection.release();
        res.json(prestamo);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
};

const updateLoan = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' });
    }
    const { id } = req.params;
    const { idPartner, idCopy } = req.body;

    const sql = "UPDATE prestamos SET socio_id = ?, id_ejemplar = ? WHERE id = ?";

    try {
        //TODO: hacer query para saber si el ejemplar de libro esta disponible, cambiar en_biblioteca del ejemplar anterio antes de actualizar
        //TODO: hacer query para saber si el socio no tiene prestamos activos y que este al dia con las cuotas
        const connection = await pool.getConnection();
        const [row] = await connection.query(sql, [ idPartner, idCopy, id ]);
        console.log(row)
        //TODO: actualizar el ejemplar cargado en_biblioteca a false 
        res.json('Prestamo actualizado con exito'); //TODO: cambiar mensaje por datos actualizados del prestamo
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
};

const returnLoan = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' });
    }
    const { idCopy } = req.params;
    const returnDate = new Date();
    const sql = 'UPDATE prestamos SET fecha_devolucion = ?, concluido = 1 WHERE id_ejemplar = ? AND concluido = 0';
    try {
        const connection = await pool.getConnection();
        const row = await connection.query(sql, [ returnDate, idCopy ])
        if(row.affectedRows != 0){
            const sqlUpdateCopy = 'UPDATE ejemplares SET en_biblioteca = 1 WHERE id = ?';
            connection.query(sqlUpdateCopy, [idCopy]);
        }
        connection.release();
        res.json({ message: 'Prestamo concluido' })
    } catch (error) {
        res.json({ message: error.err})
    }
};

const destroyLoan = async (req, res) => {
    if(!req.isAdmin) {
        return res.status(403).json({ message: 'No tiene autorizacion para realizar esta tarea ' });
    }
    const id = req.params;

};

export {
    showLoan,
    createLoan,
    returnLoan,
    updateLoan,
    destroyLoan
}