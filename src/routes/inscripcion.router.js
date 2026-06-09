const express = require('express')
const { postInscripcion, getMateriasByAlumno, getAlumnosByMateria, deleteInscripcion } = require('../controllers/inscripcion.controller')
const { validator } = require('../middlewares/validatorHandler')
const { createInscripcionSchema } = require('../schemas/inscripcion.schema')

const inscripcionRouter = express.Router()

inscripcionRouter.post('/', validator(createInscripcionSchema, 'body'), postInscripcion)
inscripcionRouter.delete('/:id', deleteInscripcion)

module.exports = inscripcionRouter
