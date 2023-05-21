const mongoose = require('mongoose');

/** Creamos el objeto con las funciones que exportaremos */
const database = {};

database.connectDB = conURI => {
  mongoose.connect(conURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log('DB is connected'))
  .catch(err => console.error(`Error al conectar a la base de datos:\n${err}`));
}

module.exports = database;
