const ctx5 = document.getElementById('charts5').getContext('2d');

fetch('mtx5.json')
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to load JSON file');
    }
  })
  .then(function(data) {
    console.log(data);

    // Sort data by BUILDING_CLASS_AT_TIME_OF_SALE
    data.sort((a, b) => a.Count.localeCompare(b.Count));

    createChart5(data);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });

function createChart5(data) {
  const labels = data.map(entry => entry.BUILDING_CLASS_AT_TIME_OF_SALE);
  const prices = data.map(entry => parseFloat(entry.average_sale_price));

  new Chart(ctx5, {
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
          beginAtZero: true
        }
      }
    }
  });
}
