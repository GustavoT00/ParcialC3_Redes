const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.set('port', 3001);


app.use(morgan('dev'));
app.use(express.json());


app.use('/users', userRoutes);


app.listen(app.get('port'), () => {
  console.log("Servidor funcionando en el puerto", app.get('port'));
});
