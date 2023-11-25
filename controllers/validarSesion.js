// middleware.js
const { response, request } = require('express');
const validarSesion = (req = request, res = response, next) => {
    if (req.session && req.session.usuario) {
        // Si la sesión está activa, permite el acceso a la ruta
        console.log('Si entras');
        next();
    } else {
        console.log('No entras ',req.session);
        // Si la sesión no está activa, redirige al inicio o a una página de inicio de sesión
        res.redirect('/');
    }
};

module.exports = { validarSesion };
