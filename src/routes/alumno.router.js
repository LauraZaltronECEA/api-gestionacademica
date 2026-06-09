const express = require('express');
const alumnoRouter = express.Router();

const{ getAlumnos, getAlumno, postAlumno, putAlumno, deleteAlumno } = require('../controllers/alumno.controller.js');
const {validator} = require('../middleware/validatorHandler');
const { createAlumnoSchema, updateAlumnoSchema, getAlumnoSchema } = require('../schemas/alumno.schema.js');

alumnoRouter.get('/', getAlumnos);
alumnoRouter.get('/:id', validator(getAlumnoSchema, 'params'), getAlumno);
alumnoRouter.post('/', validator(createAlumnoSchema, 'body'), postAlumno);
alumnoRouter.put('/:id', validator(getAlumnoSchema, 'params'), validator(updateAlumnoSchema, 'body'), putAlumno);
alumnoRouter.delete('/:id', validator(getAlumnoSchema, 'params'), deleteAlumno);

module.exports = alumnoRouter