const followModel = require('..//models/followModel');

const createFollow = async (req, res) => {
  const { usuarioP, usuarioS } = req.body;
  try {
    await followModel.createFollow(usuarioP, usuarioS);
    res.status(201).json({ message: 'Usuario seguido exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al seguir al usuario', error });
  }
};

module.exports = { createFollow };
