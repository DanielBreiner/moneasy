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
                    '#f45d5d',
                    '#23bf76',
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
}