const router = require('express').Router();
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario.controller');
const {validator} = require('../middlewares/validatorHandler');
const { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema } = require('../schemas/usuario.schema');

router.get('/', getUsuarios);
router.get('/:id', validator(getUsuarioSchema, 'params'), getUsuario);
router.post('/', validator(createUsuarioSchema, 'body'), postUsuario);
router.put('/:id', validator(getUsuarioSchema, 'params'), validator(updateUsuarioSchema, 'body'), putUsuario);
router.delete('/:id', validator(getUsuarioSchema, 'params'), deleteUsuario);

module.exports = router;