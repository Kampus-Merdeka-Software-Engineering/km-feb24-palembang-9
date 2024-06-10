const ctx = document.getElementById('charts1').getContext('2d');

fetch('mtx1.json')
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to load JSON file');
    }
  })
  .then(function(data) {
    console.log(data);

    // Sort data by year_month
    data.sort((a, b) => new Date(a.year_month) - new Date(b.year_month));

    createChart(data);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });

function createChart(data) {
  const labels = data.map(entry => entry.year_month);
  const prices = data.map(entry => parseFloat(entry.average_sale_price));

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Average Sale Price',
        data: prices,
        borderColor: '#0077B6',
        borderWidth: 2.5,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}
