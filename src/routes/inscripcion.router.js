const express = require('express')
const { postInscripcion, getInscripciones, deleteInscripcion } = require('../controllers/inscripcion.controller')
const { validator } = require('../middleware/validatorHandler')
const { createInscripcionSchema } = require('../schemas/inscripcion.schema')

const inscripcionRouter = express.Router()

inscripcionRouter.get('/', getInscripciones)
inscripcionRouter.post('/', validator(createInscripcionSchema, 'body'), postInscripcion)
inscripcionRouter.delete('/:id', deleteInscripcion)

module.exports = inscripcionRouter
