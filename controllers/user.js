const Database = require('../database/config');

const { response, request } = require('express');

// req = solicitud externa, res = respuesta a enviar
const homeget = (req = request, res = response) => {
    res.render('home')
}

const acercade = (req = request, res = response) => {
  res.render('acercade')
}
// Rutas de views
const contacto = (req = request, res = response)=>{
  res.render('contacto')
}

const registroUsuario = (req = request, res = response) => {
  res.render('registro')
}
// Rutas de views
const recuperarCuenta = (req = request, res = response)=>{
  res.render('recuperarcuenta')
}

const panelhome = (req = request, res = response) => {
  res.render('homePanel')
}
// Rutas de views
const registerPlan = (req = request, res = response)=>{
  res.render('homePanelRegPlanta')
}

const registerSistem = (req = request, res = response) => {
  res.render('homePanelRegSistema')
}
// Rutas de views
const sensors = (req = request, res = response)=>{
  res.render('homePanelSensores')
}

// Rutas de views
const chatBoot = (req = request, res = response)=>{
    res.render('homePanelChatboot')
}

// Rutas de views
const perfil = (req = request, res = response)=>{
  res.render('perfilUsuario')
}

const db = new Database();
// En tu función usuariosGet
const usuariosGet = async (req = request, res = response) => {
    const usuario = req.body.username;
    const password = req.body.password;
    try {
      // Abre la conexión a la base de datos
      await db.connect();
  
      const fields = await db.execute('CALL IniciarSesion(?, ?, @resultado)', [usuario, password]);
      // Recuperar el valor del parámetro de salida
      const [resultado] = await db.execute('SELECT @resultado as resultado');

      if(resultado.resultado === 1){
        res.redirect('/panelhome');
        req.session.usuario = usuario;
        console.log(req.session);
      }else{
        res.redirect('/');
      }
    } catch (error) {
      console.error('Error en la consulta:', error);
      res.status(500).send('Error en la consulta');
    } finally {
      try {
        // Cierra la conexión a la base de datos después de obtener los resultados
        await db.close();
      } catch (error) {
        console.error('Error al cerrar la conexión:', error);
      }
    }
};


const sensorsData = (req, res) => {
  const { body } = req; // Datos JSON enviados por Arduino
  console.log('Datos recibidos desde Arduino:', body);

  // Emitir los datos a través de Socket.IO
  const io = req.io;
  io.emit('datos-sensores', body); // Cambia 'datos-sensores' al evento que estás usando en el lado del cliente
  // Puedes enviar una respuesta de vuelta si es necesario
  res.json({ mensaje: 'Datos recibidos exitosamente' });
};
  
module.exports = {
  homeget,acercade,contacto,registroUsuario,recuperarCuenta,
  panelhome,registerPlan,registerSistem,sensors,chatBoot,perfil,usuariosGet,sensorsData
};
