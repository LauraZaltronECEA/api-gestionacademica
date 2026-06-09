const AlumnoService = require('../services/alumno.service')
const pool = require('../db/connection').pool

const service = new AlumnoService(pool)

async function getAlumnos(req, res, next){
    try{
        const data = await service.getAll(req.query.incluirBajas)
        res.json(data)
    } catch (error) {
        next(error)
    }
}

async function getAlumno(req, res, next) {
    try{
        const data = await service.getById(req.params.id)
        data ? res.json(data) : res.status(404).json({ message: 'Alumno no encontrado' })
    } catch (error) {
        next(error)
    }
}

async function postAlumno(req, res, next) {
    try{
        const data = await service.create(req.body)
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

async function putAlumno(req, res, next) {
    try{
        await service.update(req.params.id, req.body)
        res.json({ message: 'Alumno actualizado' })
    } catch (error) {
        next(error)
    }
}

async function deleteAlumno(req, res, next) {
    try{
        await service.softDelete(req.params.id)
        res.json({ message: 'Alumno dado de baja' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAlumnos,
    getAlumno,
    postAlumno,
    putAlumno,
    deleteAlumno
}