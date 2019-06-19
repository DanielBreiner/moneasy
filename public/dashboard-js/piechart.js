var chart;
function piechart(data) {
    let dataArr = [0, 0];
    data.forEach((row) => {
        if (row["amount"] > 0) {
            dataArr[0] += row["amount"];
        } else {
            dataArr[1] += row["amount"];
        }
    })
    var ctx = document.getElementById('pieChart');
    if (!chart)
        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['credit', 'debit'],
                datasets: [{
                    label: 'money',
                    data: dataArr,
                    backgroundColor: [
                        '#23bf76',
                        '#f45d5d',
                    ],
                    borderColor: [
                        '#fff',
                        '#fff',
                    ],
                    borderWidth: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
            }
        });
    else {
        chart.data.datasets[0].data = dataArr;
        chart.update();
    }
}