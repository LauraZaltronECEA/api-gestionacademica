require('dotenv').config();
const express = require('express');
const { testConnection } = require('./database/connection');

require('dotenv').config();

const usuarioRouter = require('./routes/usuarioRoutes');
const alumnoRouter = require('./routes/alumnoRoutes');
const materiaRouter = require('./routes/materiaRoutes');
const inscripcionRouter = require('./routes/inscripcionRoutes');
const { errorLog, errorHandler } = require('./middleware/errorMiddleware');

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