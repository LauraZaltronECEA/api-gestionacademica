const MateriaService = require('../services/materia.service')
const service = new MateriaService()

async function getMaterias(req, res, next) {
    try {
        const materias = await service.get(req.query.incluirBajas)
        res.json(materias)
    } catch (error) {
        next(error)
    }
}

async function getMateria(req, res, next) {
    try {
        const materia = await service.getById(req.params.id)
        res.json(materia)
    } catch (error) {
        next(error)
    }
}

async function postMateria(req, res, next) {
    try {
        const materia = await service.create(req.body)
        res.status(201).json(materia)
    } catch (error) {
        next(error)
    }
}

async function putMateria(req, res, next) {
    try {
        const materia = await service.update(req.params.id, req.body)
        res.json(materia)
    } catch (error) {
        next(error)
    }
}

async function deleteMateria(req, res, next) {
    try {
        const resultado = await service.softDelete(req.params.id)
        res.json(resultado)
    } catch (error) {
        next(error)
    }
}

module.exports = { getMaterias, getMateria, postMateria, putMateria, deleteMateria }
