//RUTAS RELACIONADAS AL USUARIO
const {Router} = require('express');
const { homeget,acercade,contacto,registroUsuario,recuperarCuenta,
       panelhome,registerPlan,registerSistem,sensors,chatBoot,perfil,usuariosGet,sensorsData
       } = require('../controllers/user');

const router = Router();
// Rutas para las vistas
router.get('/',homeget);
router.get('/acercade',acercade);
router.get('/contacto',contacto);
router.get('/registro',registroUsuario);
router.get('/recuperar',recuperarCuenta);
router.get('/panelhome',panelhome);
router.get('/panelhomeregisterPlan',registerPlan);
router.get('/panelhomeregisterSistem',registerSistem);
router.get('/panelhomesensors',sensors);
router.get('/panelhomechatBoot',chatBoot);
router.get('/panelhomeperfil',perfil);

// Rutas para las validaciones de las vistas
router.post('/login',usuariosGet);
router.post('/datasensorJson',sensorsData)
module.exports = router;