const { Router } = require('express');
const messageModel = require('../models/messageModel');
const router = Router();

// Ruta para crear un mensaje
router.post('/create', async (req, res) => {
  const { usuario_id, contenido } = req.body;
  try {
    await messageModel.createMessage(usuario_id, contenido);
    res.status(201).json({ message: 'Mensaje creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el mensaje', error });
  }
});

// Ruta para obtener mensajes de los usuarios seguidos
router.get('/from-followed', async (req, res) => {
  // Implementar la lógica para obtener mensajes de usuarios seguidos
  res.json({ message: 'Esta funcionalidad está en desarrollo' });
});

module.exports = router;