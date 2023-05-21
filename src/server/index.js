/** Iniciamos las variables de entorno */
require('dotenv').config();

/** Importaciones */
const express = require('express');
const app = express();

const database = require('./services/database');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
const socket = require('./services/socket');

/** Conexión a la base de datos */
database.connectDB(process.env.DATABASE_URI);

/** Propiedades */
const port = process.env.PORT || 3000;

/** Server settings */
app.set('port', port);

/** Middlewares */
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

/** Routes */
app.use('/api', require('./routes/user.routes'));
app.use('/api/project', require('./routes/project.routes'))
app.use('/api/tarea', require('./routes/tarea.routes'))

/** Creamos el servidor */
const server = http.createServer(app);
server.listen(app.get('port'), console.log('Teams server running on port', app.get('port')));

/** Creamos el server socket */
socket.connect(server);

