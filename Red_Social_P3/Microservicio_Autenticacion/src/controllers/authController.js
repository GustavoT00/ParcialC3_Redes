const { Router } = require('express');
const userModel = require('../../../src/models/userModel');
const bcrypt = require('bcrypt'); // Librería para cifrar contraseñas
const jwt = require('jsonwebtoken'); // Librería para manejar tokens
const router = Router();

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const user = await userModel.getUserByUsername(usuario);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token
    const token = jwt.sign({ id: user.id, rol: user.rol }, 'secreto', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});

module.exports = router;
