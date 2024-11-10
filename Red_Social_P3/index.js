const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

// Cargar controladores
const authController = require('./src/controllers/authController');
const userController = require('./src/controllers/userController');
const messageController = require('./src/controllers/messageController');
const followController = require('./src/controllers/followController');

app.use('/auth', authController);
app.use('/users', userController);
app.use('/messages', messageController);
app.use('/follows', followController);

app.listen(3000, () => {
  console.log('Servidor ejecutándose en el puerto 3000');
});