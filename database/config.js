const mysql = require('mysql2');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'crystal_acua',
    });
    this.connect();
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
      } else {
        console.log('Conexión exitosa a la base de datos');
      }
    });
  }

  execute(sql, params) {
    return new Promise((resolve, reject) => {
      this.connection.execute(sql, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  close() {
    this.connection.end((err) => {
      if (err) {
        console.error('Error al cerrar la conexión:', err);
      } else {
        console.log('Conexión cerrada correctamente');
      }
    });
  }

  execute_parseout(sql, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          // Verificar si hay parámetros de salida
          const outParams = results[0];
  
          // Filtrar solo los resultados que no son parámetros de salida
          const filteredResults = results.filter((result, index) => index > 0 || !outParams[index]);
  
          // Resolver con los resultados filtrados
          resolve(filteredResults);
        }
      });
    });
  }
  
}

module.exports = Database;
