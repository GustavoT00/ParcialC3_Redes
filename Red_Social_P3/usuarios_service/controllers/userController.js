const userModel = require('../models/userModel');
const axios = require('axios');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  const { nombre_completo, usuario, password, rol, usuario_id } = req.body;
  try {
    const hasPermission = await checkRol(usuario_id);
    if (hasPermission) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.createUser(nombre_completo, usuario, hashedPassword, rol);
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } else {
      res.status(401).json({ message: 'No tiene los permisos necesarios para crear usuarios' });
    }
  } catch (error) {
    if (error.message === 'El usuario no está autenticado') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  }
};

const checkRol = async (usuario_id) => {
  try {
    // const response = await axios.get(`http://localhost:3000/auth/status/${usuario_id}`);
    // const userStatus = response.data.status;
    
    // if (userStatus !== 'conectado') {
    //   throw new Error('El usuario no está autenticado');
    // }

    const user = await userModel.getUser(usuario_id);
    return user && user.rol === 'administrador';
  } catch (error) {
    // if (error.message === 'El usuario no está autenticado') {
    //   throw error; 
    // }

    throw new Error('Error al verificar el rol del usuario');
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

module.exports = { createUser, getAllUsers };
