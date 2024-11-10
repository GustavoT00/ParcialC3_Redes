const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Tu contraseña de MySQL
  database: 'redSocialDB'
});

// Crear una nueva relación de seguimiento
async function createFollow(usuarioP, usuarioS) {
  await connection.query('INSERT INTO relaciones (usuarioP, usuarioS) VALUES (?, ?)', [usuarioP, usuarioS]);
}

// Obtener la lista de usuarios seguidos
async function getFollowing(usuarioP) {
  const [rows] = await connection.query('SELECT usuarioS FROM relaciones WHERE usuarioP = ?', [usuarioP]);
  return rows;
}

module.exports = { createFollow, getFollowing };
