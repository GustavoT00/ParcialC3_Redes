const express = require('express');
const morgan = require('morgan');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
app.set('port', 3002);


app.use(morgan('dev'));
app.use(express.json());

app.use('/messages', messageRoutes);

app.listen(app.get('port'), () => {
  console.log("Servidor funcionando en el puerto", app.get('port'));
});

