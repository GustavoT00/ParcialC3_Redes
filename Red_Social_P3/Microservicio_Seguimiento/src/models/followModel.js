const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia según tu configuración
  database: 'followDB'
});

async function createFollow(usuarioP, usuarioS) {
  await connection.query('INSERT INTO Relaciones (usuarioP, usuarioS) VALUES (?, ?)', [usuarioP, usuarioS]);
}

module.exports = { createFollow };
