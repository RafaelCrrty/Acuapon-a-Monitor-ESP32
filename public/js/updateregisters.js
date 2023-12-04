
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnguardar").addEventListener('click', function () {
        // Validar y enviar el primer formulario
        const formParte1 = document.querySelector('#parte1 form');
        const formDataParte1 = new FormData(formParte1);
        const datosParte1 = formDataToObject(formDataParte1);
        console.log('registrar');
        // Convertir el objeto a JSON
        const jsonData = JSON.stringify(datosParte1);
        // Enviar la solicitud a la ruta en Node.js
        fetch('/updateuserscuenta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {
            
            if(data.redirect!== undefined){
                alert('Registro exitoso');
                window.location.href = '/';
            }
        })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
        });

    });

});