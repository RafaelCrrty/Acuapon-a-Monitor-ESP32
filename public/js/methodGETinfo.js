    // Función para realizar la solicitud al servidor
    async function obtenerDatos() {
        const numpeces = document.getElementById('numpeces');
        const numplantas = document.getElementById('numplantas');
        // Cuenta

        const usuario = document.getElementById('usuario');
        const contrasena = document.getElementById('contrasena');
        const nombre = document.getElementById('nombre');
        const apellido = document.getElementById('apellido');
        const generoSeleccionado = document.getElementById('genero');
        const telefono = document.getElementById('telefono');
        const email = document.getElementById('correo');
        const fechanacimiento = document.getElementById('fechanacimiento');

        // Dirección
        const estado = document.getElementById('estado');
        const municipio = document.getElementById('municipio');
        const colonia = document.getElementById('colonia');
        const postal = document.getElementById('postal');
        const call = document.getElementById('call');
        const callExt = document.getElementById('callExt');
        const callInt = document.getElementById('callInt');

        try {
          // Realizar la solicitud a la ruta que proporciona la información
          const respuesta = await fetch('/getacuaponios');
      
          // Verificar si la respuesta es exitosa (código 200)
          if (respuesta.ok) {
            // Obtener los datos como JSON
            const datos = await respuesta.json();
            console.log(datos);
      
            // Acceder a los campos específicos
            const num_plantas = datos.responseData.data.infoCountPesPlan[0][0].num_plantas;
            const cantPeces = datos.responseData.data.infoCountPesPlan[0][0].cantPeces;

            const usuarioC = datos.responseData.data.usuarioCuenta[0][0].Usuario;
            const contrasenaC = datos.responseData.data.usuarioCuenta[0][0].Password;
            const nombreC = datos.responseData.data.usuarioCuenta[0][0].nombre;
            const  apellidoC =datos.responseData.data.usuarioCuenta[0][0].apellido;
            const generoSeleC = datos.responseData.data.usuarioCuenta[0][0].genero;
            const   telefonoC =datos.responseData.data.usuarioCuenta[0][0].telefono;
            const emailC = datos.responseData.data.usuarioCuenta[0][0].correo;
            const  fechanacimC =datos.responseData.data.usuarioCuenta[0][0].fecha_nacimiento;
           
            const estadoC = datos.responseData.data.usuarioCuenta[0][0].estado;
            const municipioC = datos.responseData.data.usuarioCuenta[0][0].municipio;
            const  coloniaC = datos.responseData.data.usuarioCuenta[0][0].colonia;
            const postalC = datos.responseData.data.usuarioCuenta[0][0].cod_postal;
            const callC = datos.responseData.data.usuarioCuenta[0][0].calle;
            const callExtC = datos.responseData.data.usuarioCuenta[0][0].num_ext;
            const callIntC =datos.responseData.data.usuarioCuenta[0][0].num_int;
      
            const fechaFormateada = formatearFecha(fechanacimC);
            // Mostrar los datos en la página
            numpeces.innerHTML = `Cantidad de peces: ${cantPeces}`;
            // Mostrar los datos en la página
            numplantas.innerHTML = `Cantidad de plantas: ${num_plantas}`;
            usuario.value = `${usuarioC}`;
            contrasena.value = `${contrasenaC}`;
            nombre.value = `${nombreC}`;
            apellido.value =`${apellidoC}`;
            if(generoSeleC === 1){
              generoSeleccionado.value = 1;
            }else{
              generoSeleccionado.value = 2;
            }
            telefono.value =`${telefonoC}`;
            email.value = `${emailC}`;
            fechanacimiento.value = `${fechaFormateada}`;
            estado.value = `${estadoC}`;
            municipio.value = `${municipioC}`;
            colonia.value = `${coloniaC}`;
            postal.value = `${postalC}`;
            callExt.value = `${callExtC}`;
            callInt.value =`${callIntC}`;
            call.value = `${callC}`;
      
        } else {
            // Si la respuesta no es exitosa, mostrar un mensaje de error
            console.error('Error al obtener los datos:', respuesta.status, respuesta.statusText);
          }
        } catch (error) {
          // Manejar errores de red u otros
          console.error('Error en la solicitud:', error);
        }
      }
      
      function formatearFecha(fechaMySQL) {
        // Crear un objeto de fecha desde la cadena de fecha MySQL
        const fecha = new Date(fechaMySQL);
    
        // Obtener los componentes de la fecha
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes es de 0 a 11, por eso se suma 1
        const anio = fecha.getFullYear();
    
        // Formatear la fecha en el formato deseado (YYYY-MM-DD)
        const fechaFormateada = `${anio}-${mes}-${dia}`;
    
        return fechaFormateada;
    }
    
      // Llamar a la función al cargar la página
      obtenerDatos();