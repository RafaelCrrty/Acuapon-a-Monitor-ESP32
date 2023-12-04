const socket = io();
const ctxAreaP = document.getElementById('graficoMonitoreo2').getContext('2d');
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

const ctxAreaH = document.getElementById('graficoMonitoreo1').getContext('2d');
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


socket.on('datos-sensores', (dataJ) => {
  console.log('Datos recibidos en el cliente:', dataJ);
  rellenargraficas(etiquetasH,dataAreaH,dataJ.temperatureP,areaChartH);
  rellenargraficas(etiquetasP,dataAreaP,dataJ.flujoagua,areaChartP);
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
