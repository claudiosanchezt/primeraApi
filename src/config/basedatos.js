const mysql = require('mysql2/promise')// Es espara  trabajar con await y async

const configDataba = {
    host    : 'localhost',
    user    : 'admdb',
    password: 'szpNM25E!asdf',
    database: 'admdb'
}

const connection = async () => {
    console.log('Conexion Exitosa');
    return await mysql.createConnection(configDataba);
}

module.exports = connection
