const express = require('express');
const followController = require('../controllers/followController');

const router = express.Router();

router.post('/follow', followController.createFollow);
router.get('/:usuarioP', followController.getFollows);

module.exports = router;
