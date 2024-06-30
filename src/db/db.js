import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: process.env.IP,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

pool.getConnection()
    .then(connection => {
        console.log('Connected to the database');
        connection.release();
    })
    .catch(error => {
        console.log('Errror connecting to the database ', error);
    })

export default pool;