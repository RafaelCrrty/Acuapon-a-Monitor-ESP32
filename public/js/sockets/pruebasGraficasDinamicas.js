const ctxAreaP = document.getElementById('areaChart2').getContext('2d');

let dataAreaP = [20, 25, 18, 22, 30, 28, 35];
let dataAreaZ = [23, 25, 58, 12, 30, 28, 35];
let etiquetasP = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
const configuracionP = {
    type: 'line',
    data: {
        labels: etiquetasP,
        datasets: [{
            label: 'Caudal de flujo',
            data: dataAreaP,
        },{
            label: 'Caudal de noo',
            data: dataAreaZ,
        }
    ]
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
