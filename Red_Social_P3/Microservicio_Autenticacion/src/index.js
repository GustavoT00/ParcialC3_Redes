const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Auth Service running on port 3000');
});