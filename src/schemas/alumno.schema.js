const joi = require('joi');

const id = joi.number().integer().positive().min(1);
const nombre = joi.string().min(3).max(50).required();
const mail = joi.string().email().required();
const usuario = joi.string().min(3).max(30).required();
const password = joi.string().min(6).max(60).required();


const createAlumnoSchema = joi.object({
    nombre: nombre.required(),
    mail: mail.required(),
    usuario: usuario.required(),
    password: password.required(),
});

const updateAlumnoSchema = joi.object({
    nombre: nombre,
    mail: mail,
    usuario: usuario,
    password: password,
});


const getAlumnoSchema = joi.object({
    id: id.required()
});

module.exports = {
    createAlumnoSchema,
    updateAlumnoSchema,
    getAlumnoSchema
}