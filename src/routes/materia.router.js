const express = require('express')
const { getMaterias, getMateria, postMateria, putMateria, deleteMateria } = require('../controllers/materia.controller')
const { getAlumnosByMateria } = require('../controllers/inscripcion.controller')
const { validator } = require('../middleware/validatorHandler')
const { createMateriaSchema, updateMateriaSchema } = require('../schemas/materia.schema')

const materiaRouter = express.Router()

materiaRouter.get('/', getMaterias)
materiaRouter.get('/:id', getMateria)
materiaRouter.post('/', validator(createMateriaSchema, 'body'), postMateria)
materiaRouter.put('/:id', validator(updateMateriaSchema, 'body'), putMateria)
materiaRouter.delete('/:id', deleteMateria)
materiaRouter.get('/:id/alumnos', getAlumnosByMateria) //Cuando cree inscripcion va a funcionar

module.exports = materiaRouter
