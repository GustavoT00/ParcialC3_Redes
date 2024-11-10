const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia esto por tu contraseña de MySQL
  database: 'redSocialDB'
});

// Obtener un usuario por su nombre de usuario (para autenticación)
async function getUserByUsername(usuario) {
  const [rows] = await connection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
  return rows[0];
}

// Crear un nuevo usuario
async function createUser(nombre_completo, usuario, password, rol) {
  // Cifrar la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10); // El 10 es el número de rondas de salado
  await connection.query('INSERT INTO usuarios (nombre_completo, usuario, password, rol) VALUES (?, ?, ?, ?)', 
    [nombre_completo, usuario, hashedPassword, rol]);
}

// Obtener todos los usuarios
async function getAllUsers() {
  const [rows] = await connection.query('SELECT * FROM usuarios');
  return rows;
}

// Obtener un usuario por su `id_user` (para otras funcionalidades, como obtener detalles de un usuario específico)
async function getUserById(id_user) {
  const [rows] = await connection.query('SELECT * FROM usuarios WHERE id_user = ?', [id_user]);
  return rows[0];
}

// Actualizar información de un usuario (por ejemplo, actualizar el rol o la contraseña)
async function updateUser(id_user, updates) {
  const { nombre_completo, usuario, password, rol } = updates;
  await connection.query('UPDATE usuarios SET nombre_completo = ?, usuario = ?, password = ?, rol = ? WHERE id_user = ?', 
    [nombre_completo, usuario, password, rol, id_user]);
}

// Eliminar un usuario (si se necesita esta funcionalidad)
async function deleteUser(id_user) {
  await connection.query('DELETE FROM usuarios WHERE id_user = ?', [id_user]);
}

module.exports = { 
  getUserByUsername, 
  createUser, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
};

