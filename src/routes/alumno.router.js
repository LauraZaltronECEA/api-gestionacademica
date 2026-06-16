const express = require('express');
const alumnoRouter = express.Router();

const { getAlumnos, getAlumno, postAlumno, putAlumno, deleteAlumno } = require('../controllers/alumno.controller.js');
const { validator } = require('../middleware/validatorHandler');
const { checkAdmin } = require('../middleware/secure');
const { createAlumnoSchema, updateAlumnoSchema, getAlumnoSchema } = require('../schemas/alumno.schema.js');

alumnoRouter.get('/', getAlumnos);
alumnoRouter.get('/:id', validator(getAlumnoSchema, 'params'), getAlumno);
alumnoRouter.post('/', checkAdmin(), validator(createAlumnoSchema, 'body'), postAlumno);
alumnoRouter.put('/:id', checkAdmin(), validator(getAlumnoSchema, 'params'), validator(updateAlumnoSchema, 'body'), putAlumno);
alumnoRouter.delete('/:id', checkAdmin(), validator(getAlumnoSchema, 'params'), deleteAlumno);

module.exports = alumnoRouter