const joi = require('joi');

const id = joi.number().integer().positive().min(1);
const nombre = joi.string().min(3).max(50).required();
const email = joi.string().email().required();
const usuario = joi.string().min(3).max(30).required();
const password = joi.string().min(6).max(60).required();
const rol = joi.number().integer().valid(1, 2, 3).required();


const createUsuarioSchema = joi.object({
    nombre: nombre.required(),
    email: email.required(),
    usuario: usuario.required(),
    password: password.required(),
    rol: rol.required()
});

const updateUsuarioSchema = joi.object({
    nombre: nombre,
    email: email,
    usuario: usuario,
    password: password,
    rol: rol
});


const getUsuarioSchema = joi.object({
    id: id.required()
});

const loginUsuario = joi.string().min(3).max(30).required();
const loginPass = joi.string().min(6).max(60).required();

const loginSchema = joi.object({
    usuario: loginUsuario,
    pass: loginPass
});

module.exports = {
    createUsuarioSchema,
    updateUsuarioSchema,
    getUsuarioSchema,
    loginSchema
}