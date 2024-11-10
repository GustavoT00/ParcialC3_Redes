const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.post('/create', messageController.createMessage);

module.exports = router;
