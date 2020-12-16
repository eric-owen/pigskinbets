const fakeData = [12, 19, 7, 10, 11, 5, 3]
const fakeDates = ['12/1', '12/3', '12/7', '12/9', '12/10', '12/12', '12/15']

Chart.defaults.scale.ticks.beginAtZero = true
const ctxLine = document.getElementById('line-chart')
const ctxBar = document.getElementById('bar-chart')
const ctxPie = document.getElementById('pie-chart')

const lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: fakeDates,
        datasets: [{
            label: 'Win %',
            data: fakeData,
            backgroundColor: ['rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(153, 102, 255, 0.2)'],
            borderWidth: 1
        }]
    }
})


const barChart = new Chart(ctxBar, {

    type: 'horizontalBar',
    data: {
        labels: ['Wins', 'Losses'],
        datasets: [{
            label: 'W/L',
            data: [13, 15],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,

        }]
    }
})

const pieChart = new Chart(ctxPie, {
    type: 'doughnut',
    data: {
        labels: ['Spread', 'Moneyline', 'Total'],
        datasets: [{
            label: 'Bets Placed by Type',
            data: [3, 5, 10],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    }

})