const UsuarioService = require('../services/usuario.service');
const pool = require('../database/connection').pool

const service = new UsuarioService(pool)

async function getUsuarios(req, res, next) {
    try{
        const data = await service.getAll(req.query.incluirBajas)
        res.json(data)
    }
    catch (error) {
        next(error)
    }
}

async function getUsuario(req, res, next) {
    try{
        const data = await service.getById(req.params.id)
        data ? res.json(data) : res.status(404).json({ message: 'Usuario no encontrado' })
    }
    catch (error) {
        next(error)
    }
}

async function postUsuario(req, res, next) {
    try{
        const data = await service.create(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        next(error)
    }
}

async function putUsuario(req, res, next) {
    try{
        await service.update(req.params.id, req.body)
        res.json({ message: 'Usuario actualizado' })
    }
    catch (error) {
        next(error)
    }
}

async function deleteUsuario(req, res, next) {
    try{
        await service.delete(req.params.id, req.body.usuario_baja)
        res.json({ message: 'Usuario eliminado' })
    }
    catch (error) {
        next(error)
    }
}