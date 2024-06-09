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

    // Sort data by Count
    data.sort((a, b) => b.Count - a.Count); // Assuming 'Count' is a number

    createChart7(data);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });

function createChart7(data) {
  // Sort data by Count
  data.sort((a, b) => b.Count - a.Count); // Assuming 'Count' is a number

  // Get top 10
  const topTenData = data.slice(0, 10);

  const labels = topTenData.map(entry => entry.NEIGHBORHOOD);
  const prices = topTenData.map(entry => parseFloat(entry.average_sale_price));

  // Define colors for each bar
  const backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)'
  ];

  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)'
  ];

  new Chart(ctx7, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Average Sale Price',
        data: prices,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
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
