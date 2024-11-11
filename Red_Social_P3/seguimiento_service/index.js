const express = require('express');
const morgan = require('morgan');
const followRoutes = require('./routes/followRoutes');

const app = express();
app.set('port', 3003);

app.use(morgan('dev'));
app.use(express.json());

app.use('/follows', followRoutes);

app.listen(app.get('port'), () => {
  console.log("Servicio de seguidores funcionando en el puerto", app.get('port'));
});