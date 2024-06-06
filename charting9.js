const ctx9 = document.getElementById('charts9').getContext('2d');

fetch('mtx9.json')
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to load JSON file');
    }
  })
  .then(function(data) {
    console.log(data);

    data.sort((a, b) => a.Count.localeCompare(b.Count));

    createChart9(data);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });

  function createChart9(data) {
    data.sort((a, b) => b.Count - a.Count);
    
    const topTenData = data.slice(0, 10);
  
    const labels = topTenData.map(entry => entry.NEIGHBORHOOD);
    const prices = topTenData.map(entry => parseFloat(rata_rata_harga_per_kaki_persegi));

  new Chart(ctx9, {
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
