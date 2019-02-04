var chart = "";
var server = [];
var datalist = [];

var old = console.log;
var logger = document.getElementById('log');
console.log = function (message) {
    if (typeof message == 'object') {
        logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
    } else {
        logger.innerHTML += message + '<br />';
    }
}

function buildChart() {
    var ctx = document.getElementById("myChart").getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Players Online',
                data: datalist,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 10
                    }
                }]
            }
        }
    });
    beginGET();
}
function beginGET() {
    var interval = setInterval(() => {
        chart.data.datasets.forEach((dataset) => { //Needs to be changed to allow for lots of datasets
            makeCorsRequest("https://cors.io/?https://mcapi.xdefcon.com/server/"+ server[dataset] +"/players/json",(data) => {
                dataset.data.push(data);
                console.log(dataset);
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                chart.data.labels.push(time);
                chart.data.datasets[0].data = datalist;
                chart.options.scales = {
                        yAxes: [{
                            ticks: {
                                min: Math.min.apply(this, datalist) - 50,
                                max: Math.max.apply(this, datalist) + 50
                            }
                        }]
                }
            });
        });
        chart.update();
    }, 5000);
}

function setServer() {
    var form = document.getElementById("ip");
    server[] = form.value;
    datalist = [];
    chart.data.labels = []
    chart.update();
}
function ask4ip() {
    while(true) {
        var ip = prompt("Please Enter a Minecraft Server IP.");
        if(ip) {
            server = ip;
            buildChart();
            break;
        } else {
            continue;
        }
    }
}
function editPage() {

}
