const followModel = require('../models/followModel');
const axios = require('axios');

const createFollow = async (req, res) => {
  const { usuarioP, usuarioS } = req.body;
  try {
    const hasPermission = await checkStatus(usuarioP);
    if (hasPermission) {
      await followModel.createFollow(usuarioP, usuarioS);
      res.status(201).json({ message: 'Usuario seguido exitosamente' });
    }
  } catch (error) {
    if (error.message === 'El usuario no está autenticado') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al seguir al usuario', error });
    }
  }
};

const getFollows = async (req, res) => {
  const { usuarioP } = req.params;
  try {
    const hasPermission = await checkStatus(usuarioP);
    if (hasPermission) {
      const follows = await followModel.getFollows(usuarioP);
      if (follows.length === 0) {
        return res.status(200).json({ message: 'El usuario no tiene seguidores.' });
      }

      const followIds = follows.map(follow => follow.usuarioS);
      const messages = await axios.get(`http://localhost:3002/messages/messagesForFollows/${followIds.join(',')}`);

      const followsWithMessages = follows.map(follow => {
        const followMessages = messages.data.messages.filter(message => message.usuario_id === follow.usuarioS);
        return {
          usuarioS: follow.usuarioS,
          messages: followMessages,
        };
      });

      res.status(200).json({ follows: followsWithMessages });
    }
  } catch (error) {
    if (error.message === 'El usuario no está autenticado') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al obtener los usuarios seguidos o los mensajes', error });
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

module.exports = { createFollow, getFollows };
