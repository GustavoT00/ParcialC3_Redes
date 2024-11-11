const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rs_seguidoresdb'
});

async function createFollow(usuarioP, usuarioS) {
  await connection.query('INSERT INTO relaciones (usuarioP, usuarioS) VALUES (?, ?)', [usuarioP, usuarioS]);
}

async function getFollows(usuarioP) {
  const [rows] = await connection.query(
    'SELECT usuarioS FROM relaciones WHERE usuarioP = ?',
    [usuarioP]
  );
  return rows;
}

async function getMessagesForFollows(followIds) {
  if (followIds.length > 0) {
    const [messages] = await connection.query(
      'SELECT * FROM mensajes WHERE usuario_id IN (?)', 
      [followIds]
    );
    return messages;
  }
  return [];
}

module.exports = { createFollow, getFollows, getMessagesForFollows };
