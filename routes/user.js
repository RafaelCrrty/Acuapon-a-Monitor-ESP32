//RUTAS RELACIONADAS AL USUARIO
const {Router} = require('express');
const { usuariosGet,homeget
       } = require('../controllers/user');

const router = Router();

router.get('/',homeget);
router.post('/login',usuariosGet);
router.get('/admin',homeget);


module.exports = router;