// RUTAS RELACIONADAS AL USUARIO
const { Router } = require('express');
const { validarSesion } = require('../controllers/validarSesion');
const {
  homeget,
  acercade,
  contacto,
  registroUsuario,
  recuperarCuenta,
  panelhome,
  registerPlan,
  registerSistem,
  sensors,
  chatBoot,
  perfil,
  usuariosGet,
  sensorsData,
  describeAcuaponio,infoacuaponios
} = require('../controllers/user');

const router = Router();

// Rutas para las vistas públicas
router.get('/', homeget);
router.get('/acercade', acercade);
router.get('/contacto', contacto);
router.get('/registro', registroUsuario);
router.get('/recuperar', recuperarCuenta);

// Rutas para las vistas que requieren autenticación
router.get('/panelhome', validarSesion, panelhome);
router.get('/panelhomeregisterPlan', validarSesion, registerPlan);
router.get('/panelhomeregisterSistem', validarSesion, registerSistem);
router.get('/panelhomesensors', validarSesion, sensors);
router.get('/panelhomedescribeAcuaponio', validarSesion, describeAcuaponio);
router.get('/panelhomechatBoot', validarSesion, chatBoot);
router.get('/panelhomeperfil', validarSesion, perfil);

// Rutas para las validaciones de las vistas
router.post('/login', usuariosGet);
router.post('/datasensorJson', sensorsData);

//Rutas para consultas a la BD
router.get('/getacuaponios',infoacuaponios)

module.exports = router;
