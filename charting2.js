const ctx2 = document.getElementById('charts2').getContext('2d');

fetch('mtx2.json')
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to load JSON file');
    }
  })
  .then(function(data) {
    console.log(data);

    // Sort data by COUNT
    data.sort((a, b) => new Date(a.Count) - new Date(b.Count));

    createChart2(data);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });

function createChart2(data) {
  const labels = data.map(entry => entry.BOROUGH);
  const prices = data.map(entry => parseFloat(entry.Count));

  new Chart(ctx2, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Property Sale',
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
