require('dotenv').config();
const express = require('express');
const { testConnection } = require('./src/db/connection');

require('dotenv').config();

const usuarioRouter = require('./src/routes/usuario.router');
const alumnoRouter = require('./src/routes/alumno.router');
const materiaRouter = require('./src/routes/materia.router');
const inscripcionRouter = require('./src/routes/inscripcion.router');

const { errorLog, errorHandler } = require('./src/middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'APIRESTful Gestion Academica Taller Programacion 2' });
});

app.use('/usuarios', usuarioRouter)
app.use('/alumnos', alumnoRouter)
app.use('/materias', materiaRouter)
app.use('/inscripciones', inscripcionRouter)

app.use(errorLog)
app.use(errorHandler)

const port = process.env.PUERTO
app.listen(port, async () => {
    await testConnection()
    console.log(`Servidor escuchando en el puerto ${port}`);
});