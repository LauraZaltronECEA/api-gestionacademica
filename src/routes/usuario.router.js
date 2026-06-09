const express = require('express');
const usuarioRouter = express.Router();

const{ getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario.controller.js');
const {validator} = require('../middleware/validatorHandler');
const { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema } = require('../schemas/usuario.schema.js');

usuarioRouter.get('/', getUsuarios);
usuarioRouter.get('/:id', validator(getUsuarioSchema, 'params'), getUsuario);
usuarioRouter.post('/', validator(createUsuarioSchema, 'body'), postUsuario);
usuarioRouter.put('/:id', validator(getUsuarioSchema, 'params'), validator(updateUsuarioSchema, 'body'), putUsuario);
usuarioRouter.delete('/:id', validator(getUsuarioSchema, 'params'), deleteUsuario);

module.exports = usuarioRouter;