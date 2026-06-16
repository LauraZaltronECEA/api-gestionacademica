const express = require('express')
const { postInscripcion, getInscripciones, deleteInscripcion } = require('../controllers/inscripcion.controller')
const { validator } = require('../middleware/validatorHandler')
const { checkAuth } = require('../middleware/secure')
const { createInscripcionSchema } = require('../schemas/inscripcion.schema')

const inscripcionRouter = express.Router()

inscripcionRouter.get('/', getInscripciones)
inscripcionRouter.post('/', checkAuth(), validator(createInscripcionSchema, 'body'), postInscripcion)
inscripcionRouter.delete('/:id', checkAuth(), deleteInscripcion)

module.exports = inscripcionRouter
