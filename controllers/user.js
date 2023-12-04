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
const perfil = (req = request, res = response) => {
 res.render('perfilUsuario');
};



const describeAcuaponio = (req = request, res = response)=>{
  res.render('homepanelDescAcua')
}

const cerrarsesion = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al destruir la sesión:', err);
      res.status(500).send('Error al cerrar sesión');
    } else {
      res.redirect('/'); // Redirige a la página principal u otra página después de destruir la sesión
    }
  });
};

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

const estadomunicipio = async (req = request, res = response) =>{
  let connection; // Declarar la variable de conexión fuera del bloque try
  try {
    connection = await db.connect();
      const estados = await db.execute('CALL getEstado()');
      // Enviar los resultados como JSON
      res.json({estados});

  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: `Error en la consulta: ${error.message}` });
  } finally {
    // Cerrar la conexión en caso de error o éxito
    if (connection) {
      await db.close();
    }
  }
}

const datamunicipios = async (req = request, res = response) => {
  const estadoId = req.params.estadoId;
  let connection; // Declarar la variable de conexión fuera del bloque try
  try {
    connection = await db.connect();
      const municipio = await db.execute('CALL getMunicipio(?)',[estadoId]);
      // Enviar los resultados como JSON
      res.json({municipio});
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: `Error en la consulta: ${error.message}` });
  } finally {
    // Cerrar la conexión en caso de error o éxito
    if (connection) {
      await db.close();
    }
  }
}


//dataAcuaponioHome
const dataAcuaponioHome = async (req = request, res = response) => {
  let connection; // Declarar la variable de conexión fuera del bloque try
  try {
    connection = await db.connect();
    // Verificar si req.session.usuario está definido
    if (req.session.usuario !== undefined) {
      const fields = await db.execute('CALL getdataCountPesPlan(?)', [req.session.usuario]);
     // Estructurar los resultados en un objeto JSON
      const responseData = {
              data: {
                dataAcuaponioHome: fields,
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

const sensorsData = async (req = request, res = response) => {
  const { body } = req; // Datos JSON enviados por Arduino
  console.log('Datos recibidos desde Arduino:', body);
  let connection; // Declarar la variable de conexión fuera del bloque try
  try {
    connection = await db.connect();
    const fields = await db.execute('CALL InsertarDatosSensor(?,?,?,?,?,?,?,?)', [body.temperatureP,body.temperatureH,body.humidity,body.nivelagua,body.turvidez,body.flujoagua,body.conductividad,'07a09a51-894a-11']);
    // Estructurar los resultados en un objeto JSON
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: `Error en la consulta: ${error.message}` });
  } finally {
    // Cerrar la conexión en caso de error o éxito
    if (connection) {
      await db.close();
    }
  }
  // Emitir los datos a través de Socket.IO
  const io = req.io;
  io.emit('datos-sensores', body); // Cambia 'datos-sensores' al evento que estás usando en el lado del cliente
  // Puedes enviar una respuesta de vuelta si es necesario
  res.json({ mensaje: 'Datos recibidos exitosamente' });
};
  
const registerusers = async (req = request, res = response) => {
  let connection;
  const { body } = req; 
  try {
    connection = await db.connect();
    const diretionUsersResult = await db.execute('CALL InsertarDireccionUsuario(?,?,?,?,?,?,@p6)', [
      body.postal,
      body.colonia,
      body.call,
      body.callInt,
      body.callExt,
      body.municipio,
    ]);
    const getOutParamResult = await db.execute('SELECT @p6 as hola');
    const diretionUsersOutParam = getOutParamResult[0].hola;
    const inserUsersResult = await db.execute('CALL InsertarUsuario(?,?,?,?,?,?,?,?, @outParams)', [
      body.nombre,
      body.apellido,
      body.fechanacimiento,
      body.correo,
      body.telefono,
      body.genero,
      1,
      diretionUsersOutParam.toString()
    ]);
    const getOutParamResults = await db.execute('SELECT @outParams as outParam');
    const inserUsersOutParam = getOutParamResults[0].outParam;
    const inserCuent = await db.execute('CALL InsertarCuenta(?,?,?)', [
      body.usuario,
      body.contrasena,
      inserUsersOutParam.toString(),
    ]);
    res.json({ msj: 'Datos Insertados', redirect: '/home' });

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

const updateuserscuenta = async (req = request, res = response)=>{
  const { body } = req; 
  let connection; // Declarar la variable de conexión fuera del bloque try
  try {
    connection = await db.connect();
    // Verificar si req.session.usuario está definido
    if (req.session.usuario !== undefined) {
      const usedir_id = await db.execute('CALL getUsuariocuent(?)', [req.session.usuario]);
      const idcuenta = usedir_id[0][0].idcuenta.toString();
      const idUsuarios = usedir_id[0][0].idUsuarios.toString();
      const fields = await db.execute('CALL UpdateCuentaAndUsuarios(?,?,?,?,?,?,?,?,?,?)', [
      idcuenta,body.usuario,body.contrasena,idUsuarios,body.nombre,
      body.apellido,body.fechanacimiento,body.correo,body.telefono,body.genero]);
      console.log(body);
      res.redirect('/panelhomeperfil');
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
  
}

const updateuserscontacto = async (req = request,res = response) =>{
  const { body } = req; 
  let connection; // Declarar la variable de conexión fuera del bloque try
  try {
    connection = await db.connect();
    // Verificar si req.session.usuario está definido
    if (req.session.usuario !== undefined) {
      const usedir_id = await db.execute('CALL getUsuariocuent(?)', [req.session.usuario]);
      const idDireccion_Usuarios = usedir_id[0][0].idDireccion_Usuarios.toString();
      const fields = await db.execute('CALL UpdateDireccionUsuarios(?,?,?,?,?,?,?)', [
      idDireccion_Usuarios,body.postal,body.colonia,body.call,body.callInt,body.callExt,body.municipio
      ]);
      console.log(body);
      res.redirect('/panelhomeperfil');
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
}

module.exports = {
  homeget,acercade,contacto,registroUsuario,recuperarCuenta,
  panelhome,registerPlan,registerSistem,sensors,perfil,usuariosGet,sensorsData,
  describeAcuaponio,infoacuaponios,CaracterisAcuaponio,dataAcuaponioHome,registerusers
  ,estadomunicipio,datamunicipios,updateuserscuenta,updateuserscontacto,cerrarsesion
};
