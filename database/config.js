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
}

module.exports = Database;
