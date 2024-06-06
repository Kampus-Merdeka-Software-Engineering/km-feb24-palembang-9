const ctx7 = document.getElementById('charts7').getContext('2d');

fetch('mtx7.json')
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

    createChart7(data);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });

  function createChart7(data) {
    // Sort data by BUILDING_CLASS_AT_TIME_OF_SALE
    data.sort((a, b) => b.Count - a.Count); // Assuming 'Count' is a number
  
    // Get top 10
    const topTenData = data.slice(0, 10);
  
    const labels = topTenData.map(entry => entry.NEIGHBORHOOD);
    const prices = topTenData.map(entry => parseFloat(entry.average_sale_price));

  new Chart(ctx7, {
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
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
