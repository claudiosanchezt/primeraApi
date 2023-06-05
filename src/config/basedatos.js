require('dotenv').config();
const mysql = require('mysql2/promise')// Es espara  trabajar con await y async

const configDataba = {
    host    : process.env.HOST,
    user    : process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

const connection = async () => {
    console.log('Conexion Exitosa');
    return await mysql.createConnection(configDataba);
}

module.exports = connection
