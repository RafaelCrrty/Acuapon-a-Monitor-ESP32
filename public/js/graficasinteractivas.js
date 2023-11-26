document.addEventListener("DOMContentLoaded", function () {

    const ctxAreaH = document.getElementById('areaChart1').getContext('2d');
    let dataArea = [20, 25, 18, 22, 30, 28, 35];
    let etiquetas = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
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
    let dataAreaP = [20, 25, 18, 22, 30, 28, 35];
    let etiquetasP = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
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

    const datos = {
        fechas: ["2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04", "2023-01-05"],
        temp_pecera: [25, 26, 24, 28, 27],
        temp_hambiente: [22, 23, 21, 20, 24],
        humedad: [25, 26, 24, 28, 27],
        nivel_agua: [25, 26, 24, 28, 27],
        turvides: [25, 26, 24, 28, 27],
        flujo_agua: [15, 14, 16, 13, 15],
        conductividad: [25, 26, 24, 28, 27]
    };

    // Configuración del gráfico
    const configuracion = {
        type: 'line',
        data: {
            labels: datos.fechas,
            datasets: [
                {
                    label: 'Temperatura de la pecera',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: datos.temp_pecera
                },
                {
                    label: 'Temperatura ambiente',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    data: datos.temp_hambiente
                },
                {
                    label: 'Humedad',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    data: datos.humedad
                },
                {
                    label: 'Nivel de agua',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    data: datos.nivel_agua
                },
                {
                    label: 'Turvidez',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    data: datos.turvides
                },
                {
                    label: 'Flujo de agua',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    data: datos.flujo_agua
                },
                {
                    label: 'Conductividad',
                    borderColor: 'rgba(0, 128, 0, 1)',
                    data: datos.conductividad
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }],
                yAxes: [{
                    type: 'linear',
                    position: 'left'
                }]
            }
        }
    };

    // Obtén el contexto del canvas y crea el gráfico
    const ctx = document.getElementById('lineChart').getContext('2d');
    const lineChart = new Chart(ctx, configuracion);

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

    // Simula cambios en el nivel del agua con el tiempo (para prueba)
    let nivelActual = 0;
    setInterval(() => {
        nivelActual = (nivelActual + Math.random() * 10) % 100; // Simula cambios en el nivel del agua
        actualizarNivelPorcentaje(nivelActual);
    }, 2000); // Actualiza cada 2 segundos (puedes ajustar según tus necesidades)


});