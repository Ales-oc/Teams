const { constants } = require('crypto');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const TOKEN_KEY = process.env.TOKEN_KEY || "token_Entorno_Prueba"

/** Creamos el objeto con las funciones que exportaremos */
const token = {};

token.createToken = user => {
  /**
   * Creamos el token de identificación, para lo que necesitaremos el
   * payload (atributos del token) con la propiedad sub que identificará el sujeto al que pertenece el token,
   * agregamos también la propiedad role para almacenar el rol del usuario
   * Por último firmamos el token con una secret key para encriptar y desencriptar cuando necesitemos
   */
  return jwt.sign(
    {
      sub: user._id,
      roles: user.roles
    },
    TOKEN_KEY
  );
}

token.decodeToken = reqToken => {
  const decodedToken = jwt.verify(reqToken, TOKEN_KEY, (err, decoded) => {
    if (err) throw err;
    return decoded;
  })
  return decodedToken;
}

module.exports = token
