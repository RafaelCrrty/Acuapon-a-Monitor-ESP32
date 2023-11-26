const statusServerElement = document.getElementById('status_server');
const serverElement = document.getElementById('server');
const temperatura_a = document.getElementById('temperatura_a');
const humedad_a = document.getElementById('humedad_a');
const conductividad_a = document.getElementById('conductividad_a');
const turvidez_a = document.getElementById('turvidez_a');


const socket = io();

  const ctxAreaH = document.getElementById('areaChart1').getContext('2d');
  let dataAreaH = [];
  let etiquetasH = [];
  const configuracionH = {
      type: 'line',
      data: {
          labels: etiquetasH,
          datasets: [{
              label: 'Temperatura de la pecera',
              data: dataAreaH,
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              x: {
                  display: true,
                  title: {
                      display: true,
                      text: 'Meses'
                  }
              },
              y: {
                  display: true,
                  title: {
                      display: true,
                      text: 'Temperatura (°C)'
                  }
              }
          },
          plugins: {
              legend: {
                  display: true,
                  position: 'top'
              }
          }
      }
  };
  var areaChartH = new Chart(ctxAreaH, configuracionH);

  const ctxAreaP = document.getElementById('areaChart2').getContext('2d');
  let dataAreaP = [];
  let etiquetasP = []; 
  const configuracionP = {
      type: 'line',
      data: {
          labels: etiquetasP,
          datasets: [{
              label: 'Caudal de flujo',
              data: dataAreaP,
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              x: {
                  display: true,
                  title: {
                      display: true,
                      text: 'Meses'
                  }
              },
              y: {
                  display: true,
                  title: {
                      display: true,
                      text: 'Caudal (mml)'
                  }
              }
          },
          plugins: {
              legend: {
                  display: true,
                  position: 'top'
              }
          }
      }
  };
  var areaChartP = new Chart(ctxAreaP, configuracionP);

const ctxMultilinea = document.getElementById('lineChart').getContext('2d');

let fechas_c = [];
let temp_hambiente_c = [];
let humedad_c = [];
let turvides_c = [];
let conductividad_c = [];


const configuracionMultilinea = {
    type: 'line',
    data: {
        labels: fechas_c,
        datasets: [{
            label: 'Temperatura de ambiente',
            data: temp_hambiente_c,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)', // Color rojo
        }, {
            label: 'Humedad',
            data: humedad_c,
            fill: false,
            borderColor: 'rgba(54, 162, 235, 1)', // Color azul
        }, {
            label: 'Turvidez',
            data: turvides_c,
            fill: false,
            borderColor: 'rgba(255, 206, 86, 1)', // Color amarillo
        },  {
            label: 'Conductividad',
            data: conductividad_c,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)', // Color verde
        }]
    },
    options: {
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Meses'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Caudal (mml)'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
};

var areaLineaMultilinea = new Chart(ctxMultilinea, configuracionMultilinea);

socket.on('connect', () => {
  console.log("Conectado");
  statusServerElement.classList.remove('border-left-danger');
  statusServerElement.classList.add('border-left-success');
  serverElement.innerHTML = "Conectado al servidor";
});

socket.on('disconnect', () => {
  console.log("Desconectado");
  statusServerElement.classList.remove('border-left-success');
  statusServerElement.classList.add('border-left-danger');
  serverElement.innerHTML = "Desconectado del servidor";
});

socket.on('datos-sensores', (dataJ) => {
  console.log('Datos recibidos en el cliente:', dataJ);
  rellenargraficas(etiquetasH,dataAreaH,dataJ.temperatureP,areaChartH);
  rellenargraficas(etiquetasP,dataAreaP,dataJ.flujoagua,areaChartP);
  rellenargraficasCompuesta(fechas_c,temp_hambiente_c,humedad_c,turvides_c,conductividad_c,dataJ,areaLineaMultilinea);
  // Mostrar los datos de temperatura en el HTML
  temperatura_a.innerText =`Temperatura ambiente: ${dataJ.temperatureH} ºC`;
  humedad_a.innerText = `Huemedad: ${dataJ.humidity} %`;
  conductividad_a.innerText =`Conductividad: ${dataJ.conductividad} %`;
  turvidez_a.innerText = `Turvidez: ${dataJ.turvidez} %`;
  actualizarNivelPorcentaje(dataJ.nivelagua);
});

const rellenargraficas =(etiquetas,datasens,jsondatasensor,graficaactualizar) =>{
    // Actualizar los datos de la gráfica
    etiquetas.push(new Date().toLocaleTimeString());
    datasens.push(jsondatasensor);
    // Limitar la cantidad de datos mostrados en la gráfica (por ejemplo, a los últimos 10)
    if (etiquetas.length > 20) {
      etiquetas.shift();
      datasens.shift();
    }
    // Actualizar la gráfica
    graficaactualizar.update();
}


const rellenargraficasCompuesta = (fechas_c, temp_hambiente_c,humedad_c,turvides_c,conductividad_c, jsondatasensor,graficaactualizar) => {
  // Agrega nuevos elementos al final de cada matriz
  fechas_c.push(new Date().toLocaleTimeString());
  temp_hambiente_c.push(jsondatasensor.temperatureH);
  humedad_c.push(jsondatasensor.humidity);
  turvides_c.push(jsondatasensor.turvidez);
  conductividad_c.push(jsondatasensor.conductividad);

  // Limita la cantidad de datos mostrados en la gráfica (por ejemplo, a los últimos 10)
  if (fechas_c.length > 10) {
      fechas_c.shift();
      temp_hambiente_c.shift();
      humedad_c.shift();
      turvides_c.shift();
      conductividad_c.shift();
  }
  graficaactualizar.update();
};

function actualizarNivelPorcentaje(porcentaje) {
  const relleno = document.getElementById('nivelAgua');
  const porcentajeElemento = document.getElementById('porcentaje');

  // Limita el porcentaje entre 0 y 100
  porcentaje = Math.max(0, Math.min(100, porcentaje));

  // Actualiza la altura de la barra de relleno
  relleno.style.height = porcentaje + '%';

  // Actualiza el texto del porcentaje
  porcentajeElemento.textContent = porcentaje + '%';
}