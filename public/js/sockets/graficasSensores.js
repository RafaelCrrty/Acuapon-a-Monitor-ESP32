const statusServerElement = document.getElementById('status_server');
const serverElement = document.getElementById('server');
const temperatura_a = document.getElementById('temperatura_a');
const humedad_a = document.getElementById('humedad_a');

const socket = io();

  const ctxAreaH = document.getElementById('areaChart1').getContext('2d');
  let dataAreaH = [];
  let etiquetasH = [];
  const configuracionH = {
      type: 'line',
      data: {
          labels: etiquetasH,
          datasets: [{
              label: 'Temperatura de la pecera ºC',
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
              label: 'Caudal de flujo l/min',
              data: dataAreaP,
              fill: true,
              backgroundColor: 'rgba(4, 103, 148, 0.2)',
              borderColor: 'rgba(48, 75, 93, 1)',
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

const ctxturvides_c = document.getElementById('areaChart3').getContext('2d');

let turvides_c = [];
let etiquetasT = []; 

const configuracionT = {
    type: 'line',
    data: {
        labels: etiquetasT,
        datasets: [{
            label: 'Turvidez NTU',
            data: turvides_c,
            fill: true,
            backgroundColor: 'rgba(158, 99, 68, 0.2)',
            borderColor: 'rgba(158, 99, 68, 1)',
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
                    text: 'Voltaje'
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
var areaChartT = new Chart(ctxturvides_c, configuracionT);

const ctxconductividad_c = document.getElementById('areaChart4').getContext('2d');

let conductividad_c = [];
let etiquetasC = []; 

const configuracionC = {
    type: 'line',
    data: {
        labels: etiquetasC,
        datasets: [{
            label: 'Turvidez ppm',
            data: conductividad_c,
            fill: true,
            backgroundColor: 'rgba(243, 194, 50, 0.2)',
            borderColor: 'rgba(243, 194, 50, 1)',
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
                    text: 'ppm'
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
var areaChartC = new Chart(ctxconductividad_c, configuracionC);


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
  rellenargraficas(etiquetasT,turvides_c,dataJ.turvidez,areaChartT);
  rellenargraficas(etiquetasC,conductividad_c,dataJ.conductividad,areaChartC);
  // Mostrar los datos de temperatura en el HTML
  temperatura_a.innerText = `Temperatura ambiente: ${dataJ.temperatureH.toFixed(2)} ºC`;
  humedad_a.innerText = `Humedad: ${dataJ.humidity.toFixed(2)} %`;
  alturaPecera = 27;
  portcenta = (dataJ.nivelagua * 100) / alturaPecera;
  
  actualizarNivelPorcentaje(portcenta.toFixed(2));
});

const rellenargraficas =(etiquetas,datasens,jsondatasensor,graficaactualizar) =>{
    // Actualizar los datos de la gráfica
    etiquetas.push(new Date().toLocaleTimeString());
    datasens.push(jsondatasensor);
    // Limitar la cantidad de datos mostrados en la gráfica (por ejemplo, a los últimos 10)
    if (etiquetas.length > 40) {
      etiquetas.shift();
      datasens.shift();
    }
    // Actualizar la gráfica
    graficaactualizar.update();
}


function actualizarNivelPorcentaje(porcentaje) {
  const relleno = document.getElementById('nivelAgua');
  const porcentajeElemento = document.getElementById('porcentaje');

  // Limita el porcentaje entre 0 y 100
  porcentaje = Math.max(0, Math.min(100, porcentaje));

  // Actualiza la altura de la barra de relleno
  relleno.style.height = porcentaje + '%';

  // Actualiza el texto del porcentaje
  porcentajeElemento.textContent = porcentaje + '%';
   // Define una paleta de colores azules
   const paletaAzules = [
    '#001f3f', // Azul oscuro
    '#003366',
    '#004080',
    '#00509e',
    '#0066cc',
    '#0077e6',
    '#0099ff', // Azul claro
  ];

  // Calcula el índice en la paleta basado en el porcentaje
  const indiceColor = Math.floor((porcentaje / 100) * (paletaAzules.length - 1));

  // Obtén el color de la paleta para el porcentaje actual
  const color = paletaAzules[indiceColor];

  // Cambia el color del área de la pecera basado en el porcentaje
  relleno.style.backgroundColor = color;
}