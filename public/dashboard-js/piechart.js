var dataArr = [0,0];
function piechart(a) {
    a.forEach((item) => {
        if(item["spent"] > 0){
            dataArr[0] += item["spent"];
        }else{
            dataArr[1] += item["spent"];
        }
    })
    console.log(dataArr);
    var ctx = document.getElementById('pieChart');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['balance', 'spent'],
            datasets: [{
                label: 'money',
                data: dataArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
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
}