const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rs_mensajesdb'
});

async function createMessage(usuario_id, contenido) {
  await connection.query('INSERT INTO mensajes (usuario_id, contenido) VALUES (?, ?)', [usuario_id, contenido]);
}

async function messagesForFollows(followIds) {
  if (followIds.length > 0) {
    const [messages] = await connection.query(
      'SELECT * FROM mensajes WHERE usuario_id IN (?)', 
      [followIds]
    );
    return messages;
  }
  return [];
}

module.exports = { createMessage, messagesForFollows };
