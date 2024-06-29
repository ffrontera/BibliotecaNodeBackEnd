import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'ffrontera',
    password: process.env.DB_PWD || '3zcaw5FF#',
    database: process.env.DB_NAME || 'biblioteca',
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