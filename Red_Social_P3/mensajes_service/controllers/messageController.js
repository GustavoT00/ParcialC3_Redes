const messageModel = require('../models/messageModel');
const axios = require('axios');

const createMessage = async (req, res) => {
  const { usuario_id, contenido } = req.body;
  try {
    const hasPermission = await checkStatus(usuario_id);
    if (hasPermission) {
      await messageModel.createMessage(usuario_id, contenido);
      res.status(201).json({ message: 'Mensaje creado exitosamente' });
    }
  } catch (error) {
    if (error.message === 'El usuario no está autenticado') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  }
};

const checkStatus = async (usuario_id) => {
  try {
    const response = await axios.get(`http://localhost:3000/auth/status/${usuario_id}`);
    const userStatus = response.data.status;
    if (userStatus !== 'conectado') {
      throw new Error('El usuario no está autenticado');
    }

    return true;
  } catch (error) {
    if (error.message === 'El usuario no está autenticado') {
      throw error; 
    }
    throw new Error('Error al verificar el rol del usuario');
  }
};

const messagesForFollows = async (req, res) => {
  const { followIds } = req.params;
  try {
    const followIdsArray = followIds.split(',').map(id => parseInt(id, 10));
    const messages = await messageModel.messagesForFollows(followIdsArray);
    if (messages.length > 0) {
      res.json({ messages });
    } else {
      res.status(404).json({ message: 'Mensajes no encontrados' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al encontrar los mensajes del usuario', error });
  }
};


module.exports = { createMessage, messagesForFollows };
