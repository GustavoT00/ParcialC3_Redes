const express = require('express');
const authController = require('../controllers/authController'); 

const router = express.Router();

router.get('/status/:usuario_id', authController.getUserStatus);
router.post('/login', authController.login); 

module.exports = router;
