const express = require('express');
const morgan = require('morgan');
const followRoutes = require('./routes/followRoutes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/follows', followRoutes);

app.listen(3003, () => {
  console.log('Follow Service running on port 3003');
});