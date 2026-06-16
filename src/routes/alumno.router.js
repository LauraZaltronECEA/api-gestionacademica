const express = require('express');
const alumnoRouter = express.Router();

const { getAlumnos, getAlumno, postAlumno, putAlumno, deleteAlumno } = require('../controllers/alumno.controller.js');
const { getMateriasByAlumno } = require('../controllers/inscripcion.controller.js');
const { validator } = require('../middleware/validatorHandler');
const { checkAdmin, checkAuth, checkSelfOrAdmin } = require('../middleware/secure');
const { createAlumnoSchema, updateAlumnoSchema, getAlumnoSchema } = require('../schemas/alumno.schema.js');

alumnoRouter.get('/', checkAuth(), getAlumnos);
alumnoRouter.get('/:id', checkSelfOrAdmin(), validator(getAlumnoSchema, 'params'), getAlumno);
alumnoRouter.get('/:id/materias', checkSelfOrAdmin(), getMateriasByAlumno);
alumnoRouter.post('/', checkAdmin(), validator(createAlumnoSchema, 'body'), postAlumno);
alumnoRouter.put('/:id', checkSelfOrAdmin(), validator(getAlumnoSchema, 'params'), validator(updateAlumnoSchema, 'body'), putAlumno);
alumnoRouter.delete('/:id', checkAdmin(), validator(getAlumnoSchema, 'params'), deleteAlumno);

module.exports = alumnoRouter