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

    // Sort data by rata_rata_harga_per_kaki_persegi
    data.sort((a, b) => parseFloat(b.rata_rata_harga_per_kaki_persegi) - parseFloat(a.rata_rata_harga_per_kaki_persegi));

    // Get top 10
    const topTenData = data.slice(0, 10);

    createChart9(topTenData);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });

function createChart9(data) {
  const labels = data.map(entry => entry.neighborhood);
  const prices = data.map(entry => parseFloat(entry.rata_rata_harga_per_kaki_persegi));

  // Define colors for each slice
  const backgroundColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(99, 255, 132, 0.6)',
    'rgba(162, 54, 235, 0.6)',
    'rgba(206, 255, 86, 0.6)',
    'rgba(192, 75, 192, 0.6)'
  ];

  new Chart(ctx9, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Average building price',
        data: prices,
        backgroundColor: backgroundColors,
        borderColor: '#ffffff',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
        maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              label += context.raw.toFixed(2);
              return label;
            }
          }
        }
      }
    }
  });
}
