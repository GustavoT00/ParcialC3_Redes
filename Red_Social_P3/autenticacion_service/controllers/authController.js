const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const user = await authModel.getUserByUsername(usuario);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        await authModel.updateUserStatus(user.id, 'conectado');
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

const getUserStatus = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const user = await authModel.getUserById(usuario_id);
    if (user) {
      res.json({ status: user.estado });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar el estado del usuario', error });
  }
};

module.exports = { login, getUserStatus };
