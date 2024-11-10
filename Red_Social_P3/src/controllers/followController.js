const { Router } = require('express');
const followModel = require('../models/followModel');
const router = Router();

// Ruta para seguir a un usuario
router.post('/follow', async (req, res) => {
  const { usuarioP, usuarioS } = req.body;
  try {
    await followModel.createFollow(usuarioP, usuarioS);
    res.status(201).json({ message: 'Usuario seguido exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al seguir al usuario', error });
  }
});

// Ruta para obtener la lista de usuarios seguidos
router.get('/following/:usuarioP', async (req, res) => {
  const usuarioP = req.params.usuarioP;
  try {
    const following = await followModel.getFollowing(usuarioP);
    res.json(following);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista de usuarios seguidos', error });
  }
});

module.exports = router;
