const express = require('express')
const { postInscripcion, getInscripciones, deleteInscripcion } = require('../controllers/inscripcion.controller')
const { validator } = require('../middleware/validatorHandler')
const { checkAdmin } = require('../middleware/secure')
const { createInscripcionSchema } = require('../schemas/inscripcion.schema')

const inscripcionRouter = express.Router()

inscripcionRouter.get('/', getInscripciones)
inscripcionRouter.post('/', checkAdmin(), validator(createInscripcionSchema, 'body'), postInscripcion)
inscripcionRouter.delete('/:id', checkAdmin(), deleteInscripcion)

module.exports = inscripcionRouter
