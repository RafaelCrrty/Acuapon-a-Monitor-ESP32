async function obtenerDatos() {
    try {
        const respuesta = await fetch('/getdataHomeacuaponio');
        if (respuesta.ok) {
            const datos = await respuesta.json();

            // Verifica si los datos tienen la estructura esperada
            if (
                datos &&
                datos.responseData &&
                datos.responseData.data &&
                datos.responseData.data.dataAcuaponioHome &&
                datos.responseData.data.dataAcuaponioHome[0] &&
                datos.responseData.data.dataAcuaponioHome[0][0]
            ) {
                let content = ``;
                const primerElemento = datos.responseData.data.dataAcuaponioHome[0][0];
                // Accede a los datos específicos que mencionaste
                let cantPeces = primerElemento.cantPeces;
                let numPlantas = primerElemento.num_plantas;
                let tamaño = primerElemento.tamaño;
                let codPecera = primerElemento.cod_pecera;

                // Realiza la lógica que necesites con estos datos
                console.log("Cantidad de peces:", cantPeces);
                console.log("Número de plantas:", numPlantas);
                console.log("Tamaño:", tamaño);
                console.log("Código de la pecera:", codPecera);

                // Puedes construir tu contenido HTML aquí si es necesario
                 content += `<tr>
                 <td>${codPecera}</td>
                 <td>${tamaño}</td>
                 <td>${cantPeces}</td>
                 <td>${numPlantas}</td>
                <td>True</td>
                <td><a href="/panelhomesensors">Ver..</a></td>
                 </tr>`;
                 document.getElementById('tabledoyData').innerHTML = content;
            } else {
                console.error('Error: Estructura de datos inesperada.');
            }
        } else {
            console.error('Error al obtener los datos:', respuesta.status, respuesta.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

obtenerDatos();
