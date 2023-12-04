// RUTAS RELACIONADAS AL USUARIO
const { Router } = require('express');
const { validarSesion } = require('../controllers/validarSesion');
const {
  homeget,  acercade,  contacto,  registroUsuario,
  recuperarCuenta,updateuserscuenta,
  panelhome,  registerPlan,
  registerSistem,
  sensors,
  perfil,  usuariosGet,  sensorsData,  describeAcuaponio,infoacuaponios,CaracterisAcuaponio,
  dataAcuaponioHome,registerusers,estadomunicipio,datamunicipios,updateuserscontacto,cerrarsesion
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
router.get('/panelhomeperfil', validarSesion, perfil);

// DESTRUIR LA SESION
router.get('/cerrarsesion',cerrarsesion);


// Rutas para las validaciones de las vistas
router.post('/login', usuariosGet);
router.post('/registerusers', registerusers);
router.post('/datasensorJson', sensorsData);
router.post('/updateuserscuenta',updateuserscuenta);
router.post('/updateuserscontacto',updateuserscontacto);

//Rutas para consultas a la BD
router.get('/getacuaponios',infoacuaponios);
router.get('/getCaracterisAcuaponio',CaracterisAcuaponio);
router.get('/getdataHomeacuaponio',dataAcuaponioHome);
router.get('/estadomunicipio',estadomunicipio);
router.get('/datamunicipios/:estadoId',datamunicipios)

module.exports = router;
