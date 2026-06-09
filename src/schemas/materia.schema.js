const joi = require('joi')

const id = joi.number().integer().min(1)
const nombre_materia = joi.string().min(3).max(100)
const carrera = joi.number().integer().min(1)

const createMateriaSchema = joi.object({
    nombre_materia: nombre_materia.required(),
    carrera: carrera.required()
})

const updateMateriaSchema = joi.object({
    nombre_materia: nombre_materia,
    carrera: carrera
})

module.exports = { createMateriaSchema, updateMateriaSchema }
