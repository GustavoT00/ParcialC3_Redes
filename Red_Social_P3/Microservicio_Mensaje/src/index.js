const express = require('express');
const morgan = require('morgan');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/messages', messageRoutes);

app.listen(3002, () => {
  console.log('Message Service running on port 3002');
});
