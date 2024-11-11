const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'rs_usuariosdb'
});

async function createUser(nombre_completo, usuario, password, rol) {
  try {
    const [result] = await connection.query(
      'INSERT INTO usuarios (nombre_completo, usuario, password, rol, estado) VALUES (?, ?, ?, ?, ?)', 
      [nombre_completo, usuario, password, rol, 'desconectado']
    );
    return result.insertId;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
}

async function getAllUsers() {
  try {
    const [rows] = await connection.query('SELECT * FROM usuarios');
    return rows;
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    throw error;
  }
}

async function getUser(id) {
  try {
    const [rows] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
}

module.exports = { createUser, getAllUsers, getUser };
