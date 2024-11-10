const messageModel = require('../models/messageModel');

const createMessage = async (req, res) => {
  const { usuario_id, contenido } = req.body;
  try {
    await messageModel.createMessage(usuario_id, contenido);
    res.status(201).json({ message: 'Mensaje creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el mensaje', error });
  }
};

module.exports = { createMessage };
