const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const session = require('express-session');
const {socketController} = require('../sockets/controllers');
class Server {
    constructor(dirs) {
        this.direccion = dirs;
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.port = process.env.PORT;
        this.usuariosPath = '/';
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();

        // eventos por sockets
       // this.sockets();
    }
    // socketController
    middlewares() {
        // Cors
        this.app.use(cors());
        // Parseo y lectura del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
        // Configurar middleware para analizar cuerpos de solicitudes codificados en URL
        this.app.use(express.urlencoded({ extended: true }));
                // Configura express-session
        this.app.use(session({
            secret: 'tu_secreto', // Cambia esto con una cadena de caracteres segura
            resave: false,
            saveUninitialized: true,
        }));

        this.app.set('view engine', 'hbs');
        hbs.registerPartials(this.direccion + '/views/partials');  // Aquí se registran los parciales
       
    }

    routes() {
        const io = this.io;
        this.app.use(this.usuariosPath, (req, res, next) => {
          req.io = io;
          next();
        }, require('../routes/user'));
    }

    listen() {
        // cambiarlo a app, si es que no funciona lo del seever para sockets
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
