//RUTAS RELACIONADAS AL USUARIO
const {Router} = require('express');
const { usuariosGet} = require('../controllers/sensores');

const router = Router();

router.get('/:id',usuariosGet);

module.exports = router;