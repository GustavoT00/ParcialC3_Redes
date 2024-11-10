const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia según tu configuración
  database: 'messageDB'
});

async function createMessage(usuario_id, contenido) {
  await connection.query('INSERT INTO Mensajes (usuario_id, contenido) VALUES (?, ?)', [usuario_id, contenido]);
}

module.exports = { createMessage };
