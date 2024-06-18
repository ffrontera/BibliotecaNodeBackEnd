const mysql = requiere('mysql2');

const connection = mysql.createConection({
    host: 'localhost',
    user: 'root',
    password: 'passs',
});

connection.conect(error => {
    if (error) {
        return console.error('Error al conectar con db', error);
    };

    console.log('conectado a db');

    connection.query('CREATE DATABASE IF NOT EXISTS biblioteca', (error, results) => {
        if (error) {
            return console.error('Error al creal la base de datos', error);
        }
        console.log('db asegurada');

        connection.changeUser({ database: 'biblioteca_db' }, (error) => {
            if (error) {
                return console.error('Error al cambiar a db biblioteca_db: ', error);
            }

            //TODO: query para crear todas las tablas de la db
            const queryCrearTabalas = `
            `;
            connection.query(queryCrearTabalas, (error, results) => {
                if (error) {
                    return console.error('Error a crear tablas en la db: ', error);
                }
                console.log('Tablas aseguradas');
            });
        });
    });
});

module.exports = connection;