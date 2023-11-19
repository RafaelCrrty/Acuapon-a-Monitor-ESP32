// sensoresController.js
const { response, request } = require('express');
const Database = require('./Database'); // Ajusta la ruta según la ubicación de tu archivo Database.js

const sensoresGetData = async (req = request, res = response) => {
  const { query } = req.query;
  try {
    const db = new Database();
    await db.connect();
    // Ejemplo de consulta a la base de datos
    const results = await db.query('SELECT * FROM tu_tabla WHERE columna = ?', [query]);
    await db.disconnect();
    res.json({
      msg: 'get - controlador',
      query,
      dataFromDatabase: results
    });
  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
    res.status(500).json({
      msg: 'Error al interactuar con la base de datos'
    });
  }
};

module.exports = {
  sensoresGetData
};
