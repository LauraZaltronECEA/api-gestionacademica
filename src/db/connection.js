const mysql = require('mysql2/promise');
const config = require('../config/database');

const pool = mysql.createPool(config);

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.info('Conexión a la base de datos exitosa');
        connection.release();
        return true;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        return false;
    }
}

module.exports = {
    pool,
    testConnection
};