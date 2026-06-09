const joi = require('joi')

const id_alumno = joi.number().integer().min(1)
const id_materia = joi.number().integer().min(1)

const createInscripcionSchema = joi.object({
    id_alumno: id_alumno.required(),
    id_materia: id_materia.required()
})

module.exports = { createInscripcionSchema }
