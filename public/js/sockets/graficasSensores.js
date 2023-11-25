  const ctxAreaH = document.getElementById('areaChart').getContext('2d');
  const ctxAreaP = document.getElementById('areaCharts').getContext('2d');
  const temperatureA = document.getElementById('temperatureA');
  const humedad = document.getElementById('humedad');
  const conductividad = document.getElementById('conductividad');
  const turvidez = document.getElementById('turvidez');
  const socket = io();

  let dataArea = [];
  let etiquetas = [];
  let dataAreas = [];
  let etiquetass = [];
  // Crear Gráfico de Área

  const configuracionH = {
    type: 'line',
    data: {
        labels: etiquetas,
        datasets: [{
            label: 'Temperatura de la pecera',
            data: dataArea,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
}
const configuracionP = {
  type: 'line',
  data: {
      labels: etiquetass,
      datasets: [{
          label: 'Caudal de flujo',
          data: dataAreas,
          fill: true,
          backgroundColor: 'rgba(56, 219, 232, 0.2)',
          borderColor: 'rgba(0, 122, 232, 1)',
          borderWidth: 1
      }]
  },
}
  var areaChartH = new Chart(ctxAreaH, configuracionH);
  var areaChartP = new Chart(ctxAreaP, configuracionP);

socket.on('connect', () => {
  console.log("Conectado");
  //lbloffline.style.display = 'none';
  //lblonline.style.display = '';
});
socket.on('disconnect', () => {
  console.log("Desconectado");
  //lblonline.style.display = 'none';
  //lbloffline.style.display = '';
});

socket.on('datos-sensores', (datos) => {

  console.log('Datos recibidos en el cliente:', datos);
  rellenargraficas(etiquetas,dataArea,datos.temperatureP,areaChartH);
  rellenargraficas(etiquetass,dataAreas,datos.flujoagua,areaChartP);

  // Mostrar los datos de temperatura en el HTML
  //datosSensorElement.innerText = `Temperature: ${datos.temperature}, Humidity: ${datos.humidity}`;
    temperatureA.innerText = `${datos.temperatureH} ºC`;
    humedad.innerText = `${datos.humidity} %`;
    conductividad.innerText = `${datos.conductividad} %`;
    turvidez.innerText = `${datos.turvidez} %`;
});


const rellenargraficas =(etiquetas,datasens,jsondatasensor,graficaactualizar) =>{
    // Actualizar los datos de la gráfica
    etiquetas.push(new Date().toLocaleTimeString());
    datasens.push(jsondatasensor);
    // Limitar la cantidad de datos mostrados en la gráfica (por ejemplo, a los últimos 10)
    if (etiquetas.length > 10) {
      etiquetas.shift();
      datasens.shift();
    }
    // Actualizar la gráfica
    graficaactualizar.update();
}
