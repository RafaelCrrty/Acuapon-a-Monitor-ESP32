const usuario = document.getElementById('usuario');
const contrasena = document.getElementById('contrasena');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const telefono = document.getElementById('telefono');
const correo = document.getElementById('correo');
const fechanacimiento = document.getElementById('fechanacimiento');
// Obtener el elemento select por su ID
var generoSelect = document.getElementById("genero");

const estados = document.getElementById('estado');
const municipio = document.getElementById('municipio');

const colonia = document.getElementById('colonia');
const postal = document.getElementById('postal');
const calle = document.getElementById('call');
const callExt = document.getElementById('callExt');
const callInt = document.getElementById('callInt');

const userRegex = /^[a-zA-Z0-9]{5,}$/;
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const phoneRegex = /^\d{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const numberRegex = /^\d+$/;


fechanacimiento.addEventListener('blur', validateDateOfBirth);

function validateDateOfBirth() {
    const dateFeedbacks = document.querySelector('.fech');
    const selectedDate = new Date(fechanacimiento.value);
    // Verificar si la fecha de nacimiento está vacía
    if (!fechanacimiento.value) {
        fechanacimiento.classList.remove('is-valid');
        fechanacimiento.classList.add('is-invalid');
        dateFeedbacks.textContent = 'Debes seleccionar una fecha de nacimiento.';
        dateFeedbacks.style.color = 'red';
        return false;
    }
    const currentDate = new Date();
    // Calcular la diferencia de tiempo en milisegundos
    const timeDifference = currentDate - selectedDate;
    // Calcular la diferencia en años
    const age = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));

    if (age < 18) {
        fechanacimiento.classList.remove('is-valid');
        fechanacimiento.classList.add('is-invalid');
        dateFeedbacks.textContent = 'Debes ser mayor de 18 años para registrarte.';
        dateFeedbacks.style.color = 'red';
        return false;
        
    } else {
        fechanacimiento.classList.remove('is-invalid');
        fechanacimiento.classList.add('is-valid');
        dateFeedbacks.textContent = '';
        dateFeedbacks.style.color = '';
        return true;
    }
}

usuario.addEventListener('blur', () => {
    console.log('Escribiendo');
    validacionInputElement(usuario, '.user', userRegex, 'El nombre de usuario debe contener al menos 5 caracteres y solo puede contener letras y números.');
});
contrasena.addEventListener('blur', () => {
    console.log('Escribiendo');
    validacionInputElement(contrasena, '.pass', passRegex, 'La contraseña debe contener al menos 8 caracteres, incluyendo una letra minúscula, una letra mayúscula y un número.');
});
nombre.addEventListener('blur', () => {
    console.log('Escribiendo');
    validacionInputElement(nombre, '.nombr', nameRegex, 'El nombre debe contener solo letras.');
});
apellido.addEventListener('blur', () => {
    console.log('Escribiendo');
    validacionInputElement(apellido, '.apell', nameRegex, 'El apellido debe contener solo letras.');
});
telefono.addEventListener('blur', () => {
    console.log('Escribiendo');
    validacionInputElement(telefono, '.tele', phoneRegex, 'El número de teléfono debe tener 10 dígitos.');
});
correo.addEventListener('blur', () => {
    console.log('Escribiendo');
    validacionInputElement(correo, '.corr', emailRegex, 'El correo electrónico debe tener un formato válido.');
});

colonia.addEventListener('blur', () => {
    console.log('Escribiendo');
    validacionInputElement(colonia, '.colo', nameRegex, 'El nombre de la colonia debe contener solo letras.');
});
calle.addEventListener('blur', () => {
    console.log('Escribiendo');
    validacionInputElement(calle, '.calle', nameRegex, 'El nombre de la calle debe contener solo letras.');
});
postal.addEventListener('blur', () => {
    console.log('Escribiendo');
    validacionInputElement(postal, '.post', numberRegex, 'El código postal debe contener solo números.');
});
callExt.addEventListener('blur', () => {
    console.log('Escribiendo');
    validacionInputElement(callExt, '.callE', numberRegex, 'La extensión de la calle debe contener solo números.');
});
callInt.addEventListener('blur', () => {
    console.log('Escribiendo');
    validacionInputElement(callInt, '.callI', numberRegex, 'El número interior debe contener solo números.');
});

const validacionInputElement = (input, selector, regex, msj, eventIA = false) => {
    if (!eventIA) {
        const longitud = input.value.length;
        if (longitud <= 0) {
            // Mostrar mensaje de error si el campo está vacío
            const feedbackDiv = document.querySelector(selector);
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            feedbackDiv.textContent = "Este campo es obligatorio.";
            feedbackDiv.style.color = 'red';
            return false;
        }
    }

    // Validar que haya por lo menos datos en el input
    const esFormatoCorrecto = input.value.match(regex);
    const feedbackDiv = document.querySelector(selector);

    if (esFormatoCorrecto) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        feedbackDiv.textContent = '';
        feedbackDiv.style.color = '';
        return true;
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        feedbackDiv.textContent = msj;
        feedbackDiv.style.color = 'red';
        return false;
    }
}

const usuariom = document.getElementById('usuarioM');
const contrasenam = document.getElementById('contrasenaM');
const nombrem = document.getElementById('nombreM');
const telefonom = document.getElementById('telefonoM');
const correom = document.getElementById('correoM');
const fechanacimientom = document.getElementById('fechanacimientoM');

const coloniam = document.getElementById('coloniaM');
const postalm  =document.getElementById('postalM');
const callExtm =document.getElementById('callExtM');
const callIntm = document.getElementById('callIntM');

const generom = document.getElementById('generoM');
const estadom = document.getElementById('estadoM');
const municipiom = document.getElementById('municipioM');

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnregistrar").addEventListener('click', function () {
        // Validar y enviar el primer formulario
        const formParte1 = document.querySelector('#parte1 form');
        const formDataParte1 = new FormData(formParte1);
        const datosParte1 = formDataToObject(formDataParte1);

        // Obtener datos del segundo formulario
        const formParte2 = document.querySelector('#parte2 form');
        const formDataParte2 = new FormData(formParte2);
        const datosParte2 = formDataToObject(formDataParte2);

        // Combinar los datos de ambos formularios en un solo objeto
        const datosCombinados = { ...datosParte1, ...datosParte2 };

        // Convertir el objeto a JSON
        const jsonData = JSON.stringify(datosCombinados);
        // Enviar la solicitud a la ruta en Node.js
        fetch('/registerusers', {
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

    // Función para convertir FormData a un objeto
    function formDataToObject(formData) {
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        return object;
    }
    // Script para controlar la paginación
    document.getElementById("btnSiguiente1").addEventListener("click", function () {
        const esUservalido = validacionInputElement(usuario, '.user', userRegex, 'El nombre de usuario debe contener al menos 5 caracteres y solo puede contener letras y números.');
        const esPassvalido = validacionInputElement(contrasena, '.pass', passRegex, 'La contraseña debe contener al menos 8 caracteres, incluyendo una letra minúscula, una letra mayúscula y un número.');
        const esnombrevalido = validacionInputElement(nombre, '.nombr', nameRegex, 'El nombre debe contener solo letras.');
        const esapellidovalido = validacionInputElement(apellido, '.apell', nameRegex, 'El apellido debe contener solo letras.');
        const estelfvaldido = validacionInputElement(telefono, '.tele', phoneRegex, 'El número de teléfono debe tener 10 dígitos.');    
        const escorrvalido = validacionInputElement(correo, '.corr', emailRegex, 'El correo electrónico debe tener un formato válido.');
        const validatedate = validateDateOfBirth();
    
        // Prevenir el envío del formulario si alguna validación no es exitosa
        if (esUservalido && esPassvalido && esnombrevalido && esapellidovalido && estelfvaldido && escorrvalido && validatedate) {
            document.getElementById("parte1").style.display = "none";
            document.getElementById("parte2").style.display = "block";    
        }
        
    });

    document.getElementById("btnAnterior2").addEventListener("click", function () {
            document.getElementById("parte2").style.display = "none";
            document.getElementById("parte1").style.display = "block";
    });


    document.getElementById("btnGuardar").addEventListener("click", itemspreview);
    function itemspreview() {
        const escolvalido   = validacionInputElement(colonia, '.colo', nameRegex, 'El nombre de la colonia debe contener solo letras.')
        const esposvalido   = validacionInputElement(postal, '.post', numberRegex, 'El código postal debe contener solo números.')
        const escallEvalido = validacionInputElement(callExt, '.callE', numberRegex, 'La extensión de la calle debe contener solo números.')
        const escallIvalido = validacionInputElement(callInt, '.callI', numberRegex, 'El número interior debe contener solo números.');

        if(escolvalido && esposvalido && escallEvalido && escallIvalido){
             document.getElementById('btnGuardar').setAttribute('data-target', '#exampleModal');
            usuariom.innerText = usuario.value;
            contrasenam.innerText = contrasena.value;
            nombrem.innerText = nombre.value +' '+apellido.value;
            telefonom.innerText = telefono.value;
            correom.innerText = correo.value;
            fechanacimientom.innerText = fechanacimiento.value;
            coloniam.innerText = colonia.value;
            postalm.innerText  = postal.value;
            callExtm.innerText = callExt.value;
            callIntm.innerText = callInt.value;
            estadom.innerText = estados.value;
            municipiom.innerText = municipio.value;
            generom.innerText =  generoSelect.value;        
        } else {
            // Si no se cumple la condición, puedes remover la propiedad data-target
            document.getElementById('btnGuardar').removeAttribute('data-target');
        }

    }

});

const estadosgetdata = async () => {
    try {
        const response = await fetch("/estadomunicipio");
        const estadosd = await response.json();

        let content = ``;

        for (const estado of estadosd.estados[0]) {
            const idest = estado.idestado;
            const est = estado.estado;
            content += `<option value="${idest}">${est}</option>`;
        }

        estados.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
};

// Función para cargar los municipios según el estado seleccionado
const cargarMunicipios = async () => {
    try {
        // Obtener el valor seleccionado (idestado)
        const idestadoSeleccionado = estados.value;
        console.log(idestadoSeleccionado);

        // Realizar una petición para obtener los municipios según el estado seleccionado
        const response = await fetch(`/datamunicipios/${idestadoSeleccionado}`);
        const municipiosL = await response.json();

        // Llenar el select de municipios
        console.log(municipiosL);
        let content = '';
        for (const muni of municipiosL.municipio[0]) {
            content += `<option value="${muni.id_municipio}">${muni.municipio}</option>`;
        }

        municipio.innerHTML = content;
    } catch (ex) {
        console.error(ex);
    }
};

estados.addEventListener('change', cargarMunicipios);


window.addEventListener("load", async () => {
    await estadosgetdata(); 

});





