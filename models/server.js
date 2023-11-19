const express = require('express');
const cors = require('cors');
const hbs = require('hbs');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/';

        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        
        // Cors
        this.app.use(cors());
        // Parseo y lectura del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
        // Configurar middleware para analizar cuerpos de solicitudes codificados en URL
        this.app.use(express.urlencoded({ extended: true }));

        this.app.set('view engine', 'hbs');
        hbs.registerPartials(__dirname + '/views/partials');  // Aquí se registran los parciales
        
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
