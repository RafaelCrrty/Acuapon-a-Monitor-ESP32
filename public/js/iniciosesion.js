const formss = document.getElementById('formss');
const user = document.getElementById('username');
const pass = document.getElementById('password');

const userRegex = /^[a-zA-Z0-9]{5,}$/;
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const validacionInputElement = (input, selector, regex, msj, eventIA = false) => {
    if (!eventIA) {
        const longitud = input.value.length;
        if (longitud <= 0) {
            // Mostrar mensaje de error si el campo está vacío
            const feedbackDiv = document.querySelector(selector);
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

user.addEventListener('blur', () => {
    validacionInputElement(user, '.userna', userRegex, 'El nombre de usuario debe contener al menos 5 caracteres y solo puede contener letras y números.');
});

pass.addEventListener('blur', () => {
    validacionInputElement(pass, '.pass', passRegex, 'La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula y un número.');
});

formss.addEventListener('submit', (event) => {
    // Realizar las validaciones antes de enviar el formulario
    const isValidUser = validacionInputElement(user, '.userna', userRegex, 'El nombre de usuario debe contener al menos 5 caracteres y solo puede contener letras y números.');
    const isValidPass = validacionInputElement(pass, '.pass', passRegex, 'La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula y un número.');

    // Prevenir el envío del formulario si alguna validación no es exitosa
    if (!isValidUser || !isValidPass) {
        event.preventDefault();
    }
});