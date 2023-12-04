async function obtenerDatos() {

    const especiePes = document.getElementById('especiePes');
    const especieplan = document.getElementById('especieplan');
    const crecimientoPes = document.getElementById('crecimientoPes');
    const crecimientoPlan = document.getElementById('crecimientoPlan');
    const alimentaPes = document.getElementById('alimentaPes');
    const frecuenRiegoPlan = document.getElementById('frecuenRiegoPlan');    
    const cod_pecera = document.getElementById('cod_pecera');
    const fechaInstlacion = document.getElementById('fechaInstlacion');
    const tam_pecera = document.getElementById('tam_pecera');
    const cant_peces = document.getElementById('cant_peces');
    const cant_plan = document.getElementById('cant_plan');
    const direccion_pecera = document.getElementById('direccion_pecera');
    
    try{
    // Realizar la solicitud a la ruta que proporciona la información
    const respuesta = await fetch('/getCaracterisAcuaponio');  
    // Verificar si la respuesta es exitosa (código 200)
    if (respuesta.ok) {
    // Obtener los datos como JSON
    const datos = await respuesta.json();

    const especiePesC = datos.responseData.data.acuaponioInfo[0][0].especiePez;
    const especieplanC = datos.responseData.data.acuaponioInfo[0][0].especiePla;
    const crecimientoPesC = datos.responseData.data.acuaponioInfo[0][0].tasa_creci;
    const crecimientoPlanC = datos.responseData.data.acuaponioInfo[0][0].nutricion;
    const alimentaPesC = datos.responseData.data.acuaponioInfo[0][0].frecu_alimen;
    const frecuenRiegoPlanC = datos.responseData.data.acuaponioInfo[0][0].frecRiego;
    const cod_peceraC = datos.responseData.data.acuaponioInfo[0][0].cod_pecera;
    const fechaInstlacionC  = datos.responseData.data.acuaponioInfo[0][0].fecha_instalacion;
    const tam_peceraC = datos.responseData.data.acuaponioInfo[0][0].tamaño;
    const cant_pecesC = datos.responseData.data.acuaponioInfo[0][0].cantPeces;
    const cant_planC = "3";

    // Obtener datos
    const estado = datos.responseData.data.acuaponioInfo[0][0].estado;
    const municipio = datos.responseData.data.acuaponioInfo[0][0].municipio;
    const colonia = datos.responseData.data.acuaponioInfo[0][0].colonia;
    const codPostal = datos.responseData.data.acuaponioInfo[0][0].cod_postal;
    const numInt = datos.responseData.data.acuaponioInfo[0][0].num_int;
    const numExt = datos.responseData.data.acuaponioInfo[0][0].num_ext;

    // Construir dirección
    const direccion_peceraC = `${numExt ? `Num. Ext. ${numExt},` : ''} ${numInt ? `Num. Int. ${numInt},` : ''} ${colonia ? `Col. ${colonia},` : ''} ${municipio ? `${municipio},` : ''} ${estado ? `${estado},` : ''} C.P. ${codPostal}`;

    especiePes.value = especiePesC;
    especieplan.value = especieplanC;
    crecimientoPes.value =crecimientoPesC;
    crecimientoPlan.value = crecimientoPlanC;
    alimentaPes.value = alimentaPesC;
    frecuenRiegoPlan.value = frecuenRiegoPlanC;
    cod_pecera.value = cod_peceraC;
    fechaInstlacion.value = fechaInstlacionC;
    tam_pecera.value = tam_peceraC;
    cant_peces.value = cant_pecesC;
    cant_plan.value = cant_planC;
    direccion_pecera.value = direccion_peceraC;

    console.log(datos);
    } else {
    // Si la respuesta no es exitosa, mostrar un mensaje de error
        console.error('Error al obtener los datos:', respuesta.status, respuesta.statusText);
    }
    } catch (error) {
          // Manejar errores de red u otros
          console.error('Error en la solicitud:', error);
    }
}

obtenerDatos();