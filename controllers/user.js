const {response,request} = require('express');

// req = respuesta externa, res = respuesta a enviar
const usuariosGet = (req=request,res = response) =>{
    const {query} = req.query;
    res.json({
        msg: 'get - controlador',
        query
    });
}

const usuariosPut = (req,res = response) =>{
    const id = req.params.id;
    res.json({
        msg: 'put - controlador',
        id
    });
}

const usuariosPost = (req,res = response) =>{
    // Desetructurar {,,}
    const body = req.body;
    res.json({
        msg: 'post - controlador',
        body
    });
}

const usuariosDelete = (req,res = response) =>{
    res.json({
        msg: 'delete - controlador'
    });
}

module.exports = {
    usuariosGet,usuariosPut,
    usuariosPost,usuariosDelete
}