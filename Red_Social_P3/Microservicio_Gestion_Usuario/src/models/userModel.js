const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia según tu configuración
  database: 'authUserDB'
});

async function createUser(nombre_completo, usuario, password, rol) {
  await connection.query('INSERT INTO Usuarios (nombre_completo, usuario, password, rol) VALUES (?, ?, ?, ?)', 
    [nombre_completo, usuario, password, rol]);
}

async function getAllUsers() {
  const [rows] = await connection.query('SELECT * FROM Usuarios');
  return rows;
}

module.exports = { createUser, getAllUsers };

