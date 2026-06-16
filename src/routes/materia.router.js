const express = require('express')
const { getMaterias, getMateria, postMateria, putMateria, deleteMateria } = require('../controllers/materia.controller')
const { getAlumnosByMateria } = require('../controllers/inscripcion.controller')
const { validator } = require('../middleware/validatorHandler')
const { checkAdmin } = require('../middleware/secure')
const { createMateriaSchema, updateMateriaSchema } = require('../schemas/materia.schema')

const materiaRouter = express.Router()

materiaRouter.get('/', getMaterias)
materiaRouter.get('/:id', getMateria)
materiaRouter.get('/:id/alumnos', getAlumnosByMateria)
materiaRouter.post('/', checkAdmin(), validator(createMateriaSchema, 'body'), postMateria)
materiaRouter.put('/:id', checkAdmin(), validator(updateMateriaSchema, 'body'), putMateria)
materiaRouter.delete('/:id', checkAdmin(), deleteMateria)

module.exports = materiaRouter
