const express = require('express');
const usuarioRouter = express.Router();

const { login, getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario.controller.js');
const { validator } = require('../middleware/validatorHandler');
const { checkAdmin } = require('../middleware/secure');
const { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema, loginSchema } = require('../schemas/usuario.schema.js');

usuarioRouter.post('/login', validator(loginSchema, 'body'), login);
usuarioRouter.get('/', getUsuarios);
usuarioRouter.get('/:id', validator(getUsuarioSchema, 'params'), getUsuario);
usuarioRouter.post('/',validator(createUsuarioSchema, 'body'), postUsuario);

//usuarioRouter.post('/', checkAdmin(), validator(createUsuarioSchema, 'body'), postUsuario);
usuarioRouter.put('/:id', checkAdmin(), validator(getUsuarioSchema, 'params'), validator(updateUsuarioSchema, 'body'), putUsuario);
usuarioRouter.delete('/:id', checkAdmin(), validator(getUsuarioSchema, 'params'), deleteUsuario);

module.exports = usuarioRouter;