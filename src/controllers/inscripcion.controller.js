const InscripcionService = require('../services/inscripcion.service')
const service = new InscripcionService()

async function postInscripcion(req, res, next) {
    try {
        const inscripcion = await service.create(req.body)
        res.status(201).json(inscripcion)
    } catch (error) {
        next(error)
    }
}

async function getMateriasByAlumno(req, res, next) {
    try {
        const materias = await service.getMateriasByAlumno(req.params.id, req.query.incluirBajas)
        res.json(materias)
    } catch (error) {
        next(error)
    }
}

async function getAlumnosByMateria(req, res, next) {
    try {
        const alumnos = await service.getAlumnosByMateria(req.params.id, req.query.incluirBajas)
        res.json(alumnos)
    } catch (error) {
        next(error)
    }
}

async function deleteInscripcion(req, res, next) {
    try {
        const resultado = await service.softDelete(req.params.id)
        res.json(resultado)
    } catch (error) {
        next(error)
    }
}

module.exports = { postInscripcion, getMateriasByAlumno, getAlumnosByMateria, deleteInscripcion }
