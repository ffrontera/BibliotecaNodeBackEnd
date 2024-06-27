require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'ffrontera',
    password: process.env.DB_PWD || '3zcaw5FF#',
    database: process.env.DB_NAME || 'biblioteca'
});

connection.connect((error)=> {
    if(error) {
        return console.log(error);
    }

    console.log('conectado a db');
})

module.exports = connection;