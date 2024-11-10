const { Router } = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const router = Router();

// Ruta para crear un nuevo usuario (solo para administradores)
router.post('/create', async (req, res) => {
  const { nombre_completo, usuario, password, rol } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Cifrar la contraseña
    await userModel.createUser(nombre_completo, usuario, hashedPassword, rol);
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
});

module.exports = router;
