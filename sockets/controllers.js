const socketController = (io) =>(socket) => {
    console.log('Cliente conectado: ', socket.id);

    socket.on('datos-sensores', (datos) => {
        console.log('Datos recibidos desde el ESP32:', datos);
        // Emite el evento 'enviar-datasensors' en la ruta '/sensores'
        io.of('/sensores').emit('enviar-datasensors', datos);
    });
};

module.exports = {
    socketController
};
