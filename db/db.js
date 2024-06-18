const mysql = requiere('mysql2');

const connection = mysql.createConection({
    host: 'localhost',
    user: 'root',
    password: 'passs',
    database: 'biblioteca'
});

connection.conect(error => {
    if(error) {
        return console.log(error);
    }

    console.log('conectado a db');
})

module.exports = connection;