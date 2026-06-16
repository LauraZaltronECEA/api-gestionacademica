const InscripcionService = require('../services/inscripcion.service')
const service = new InscripcionService()

async function postInscripcion(req, res, next) {
    try {
        const inscripcion = await service.create(req.body, req.user)
        res.status(201).json(inscripcion)
    } catch (error) {
        next(error)
    }
}

async function getInscripciones(req, res, next) {
    try {
        const alumnoId = req.query.alumnoId
        const incluirBajas = req.query.incluirBajas === 'true'
        const resultado = await service.getInscripciones(alumnoId, incluirBajas)
        res.json(resultado)
    } catch (error) {
        next(error)
    }
}

async function getAlumnosByMateria(req, res, next) {
    try {
        const { id } = req.params
        const incluirBajas = req.query.incluirBajas === 'true'
        const resultado = await service.getAlumnosByMateria(id, incluirBajas)
        res.json(resultado)
    } catch (error) {
        next(error)
    }
}

async function getMateriasByAlumno(req, res, next) {
    try {
        const { id } = req.params
        const incluirBajas = req.query.incluirBajas === 'true'
        const resultado = await service.getInscripciones(id, incluirBajas)
        res.json(resultado)
    } catch (error) {
        next(error)
    }
}

async function deleteInscripcion(req, res, next) {
    try {
        const resultado = await service.softDelete(req.params.id, req.user)
        res.json(resultado)
    } catch (error) {
        next(error)
    }
}

module.exports = { postInscripcion, getInscripciones, getAlumnosByMateria, getMateriasByAlumno, deleteInscripcion }
