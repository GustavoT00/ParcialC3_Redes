const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoutes);

app.listen(app.get('port'), () => {
  console.log("Servicio de autenticación funcionando en el puerto", app.get('port'));
});
