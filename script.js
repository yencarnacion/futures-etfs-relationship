const ctx = document.getElementById('myChart').getContext('2d');
let myChart;

function createChart(data, minY, maxY) {
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: { beginAtZero: true },
                y: { 
                    beginAtZero: false,
                    min: minY, // Dynamic minimum value for y-axis
                    max: maxY, // Dynamic maximum value for y-axis
                }
            }
        }
    });
}

function plotRange() {
    const topValue = parseFloat(document.getElementById('topValue').value);
    const bottomValue = parseFloat(document.getElementById('bottomValue').value);
    const constantValue = parseFloat(document.getElementById('constantValue').value);

    // Calculate dynamic min and max for y-axis
    const minY = bottomValue / constantValue;
    const maxY = topValue / constantValue;

    const data = {
        labels: [],
        datasets: [{
            label: `x / ${constantValue}`,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            data: [],
        }]
    };

    for (let x = bottomValue; x <= topValue; x += 0.25) { // Increment by a small value for finer granularity
        data.labels.push(x.toFixed(2));
        data.datasets[0].data.push((x / constantValue).toFixed(2));
    }

    createChart(data, minY, maxY);
}
