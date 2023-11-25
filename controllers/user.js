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
const perfil = (req = request, res = response) => {
 res.render('perfilUsuario');
};



const describeAcuaponio = (req = request, res = response)=>{
  res.render('homepanelDescAcua')
}



const db = new Database();
// En tu función usuariosGet
const usuariosGet = async (req = request, res = response) => {
    const usuario = req.body.username;
    const password = req.body.password;
    let connection; // Declarar la variable de conexión fuera del bloque try
    try {
      // Abre la conexión a la base de datos
      connection = await db.connect();
      const fields = await db.execute('CALL IniciarSesion(?, ?, @resultado)', [usuario, password]);
      // Recuperar el valor del parámetro de salida
      const [resultado] = await db.execute('SELECT @resultado as resultado');

      if(resultado.resultado === 1){
        req.session.usuario = usuario;
        console.log(req.session);
        res.redirect('/panelhome');
      }else{
        res.redirect('/');
      }
    } catch (error) {
      console.error('Error en la consulta:', error);
      res.status(500).send('Error en la consulta');
    } finally {
      // Cerrar la conexión en caso de error o éxito
      if (connection) {
        await db.close();
      }
    }
};

const infoacuaponios = async (req = request, res = response) => {
  let connection; // Declarar la variable de conexión fuera del bloque try
  try {
    connection = await db.connect();

    // Verificar si req.session.usuario está definido
    if (req.session.usuario !== undefined) {
      const fields = await db.execute('CALL getdataCountPesPlan(?)', [req.session.usuario]);
      const fields2 = await db.execute('CALL getUsuariocuent(?)', [req.session.usuario]);
            // Estructurar los resultados en un objeto JSON
      const responseData = {
              data: {
                infoCountPesPlan: fields,
                usuarioCuenta: fields2
              }
      };
      // Enviar los resultados como JSON
      res.json({responseData});
    } else {
      // Manejar el caso donde req.session.usuario es undefined
      res.status(400).json({ error: 'El usuario no está definido en la sesión.' });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: `Error en la consulta: ${error.message}` });
  } finally {
    // Cerrar la conexión en caso de error o éxito
    if (connection) {
      await db.close();
    }
  }
};

const CaracterisAcuaponio = async (req = request, res = response) => {
  let connection; // Declarar la variable de conexión fuera del bloque try
  try {
    connection = await db.connect();
    // Verificar si req.session.usuario está definido
    if (req.session.usuario !== undefined) {
      const fields = await db.execute('CALL getdataAcuaponioUser(?)', [req.session.usuario]);
      // Estructurar los resultados en un objeto JSON
      const responseData = {
              data: {
                acuaponioInfo: fields,
              }
      };
      // Enviar los resultados como JSON
      res.json({responseData});
    } else {
      // Manejar el caso donde req.session.usuario es undefined
      res.status(400).json({ error: 'El usuario no está definido en la sesión.' });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: `Error en la consulta: ${error.message}` });
  } finally {
    // Cerrar la conexión en caso de error o éxito
    if (connection) {
      await db.close();
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
  panelhome,registerPlan,registerSistem,sensors,chatBoot,perfil,usuariosGet,sensorsData,describeAcuaponio,infoacuaponios,CaracterisAcuaponio
};
