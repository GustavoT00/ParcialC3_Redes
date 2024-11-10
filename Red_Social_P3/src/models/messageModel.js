const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Tu contraseña de MySQL
  database: 'redSocialDB'
});

// Crear un nuevo mensaje
async function createMessage(usuario_id, contenido) {
  await connection.query('INSERT INTO mensajes (usuario_id, contenido) VALUES (?, ?)', [usuario_id, contenido]);
}

module.exports = { createMessage };
