const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/users', userRoutes);

app.listen(3001, () => {
  console.log('User Service running on port 3001');
});
