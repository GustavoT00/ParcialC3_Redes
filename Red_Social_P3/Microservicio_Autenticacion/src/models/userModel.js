const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia según tu configuración
  database: 'authUserDB'
});

async function getUserByUsername(usuario) {
  const [rows] = await connection.query('SELECT * FROM Usuarios WHERE usuario = ?', [usuario]);
  return rows[0];
}

module.exports = { getUserByUsername };
