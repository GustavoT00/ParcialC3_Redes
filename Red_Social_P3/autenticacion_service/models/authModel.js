const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'rs_usuariosdb'
});

async function getUserByUsername(usuario) {
  try {
    const [result] = await connection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    return result[0];
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const [result] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return result[0];
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    throw error;
  }
}

async function updateUserStatus(id, status) {
  try {
    await connection.query('UPDATE usuarios SET estado = ? WHERE id = ?', [status, id]);
  } catch (error) {
    console.error('Error al actualizar el estado del usuario:', error);
    throw error;
  }
}

module.exports = { getUserByUsername, getUserById, updateUserStatus };
