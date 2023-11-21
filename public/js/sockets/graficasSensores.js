const lblonline = document.getElementById('lblonline');
const lbloffline = document.getElementById('lbloffline');
// En el frontend
const socket = io();


socket.on('connect', () => {
    console.log("Conectado");
    lbloffline.style.display = 'none';
    lblonline.style.display = '';
});

socket.on('disconnect', () => {
    console.log("Desconectado");
    lblonline.style.display = 'none';
    lbloffline.style.display = '';
});

// Escucha el evento 'enviar-datasensors' desde el servidor
socket.on('datos-sensores', (datos) => {
    console.log('Datos recibidos en el cliente:', datos);
    document.getElementById('datosSensor').innerText = `temperature: ${datos.temperature}, humidity: ${datos.humidity}`;
});
