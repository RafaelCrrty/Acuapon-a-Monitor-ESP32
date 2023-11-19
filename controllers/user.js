const Database = require('../database/config');
const { response, request } = require('express');

// req = solicitud externa, res = respuesta a enviar
const homeget = (req = request, res = response) => {
    res.render('home');
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
        res.redirect('/admin');
      }else{
        res.redirect('/admin');
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
  
  
module.exports = {
    usuariosGet,
    homeget
};
