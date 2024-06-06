const ctx3 = document.getElementById('charts3').getContext('2d');

fetch('mtx3.json')
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

    createChart3(data);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });

function createChart3(data) {
  const labels = data.map(entry => entry.BOROUGH);
  const counts = data.map(entry => parseFloat(entry.Count));

  // Calculate total count
  const total = counts.reduce((sum, value) => sum + value, 0);

  // Define specific colors for each segment
  const colors = [
    'rgba(255, 99, 132, 0.6)',    // Red
    'rgba(54, 162, 235, 0.6)',    // Blue
    'rgba(255, 206, 86, 0.6)',    // Yellow
    'rgba(75, 192, 192, 0.6)',    // Green
    'rgba(153, 102, 255, 0.6)',   // Purple
    'rgba(255, 159, 64, 0.6)'     // Orange
    // Add more colors as needed
  ];

  new Chart(ctx3, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: 'Percentage of property sales',
        data: counts,
        backgroundColor: colors.slice(0, counts.length), // Use predefined colors
        borderColor: '#0077B6',
        borderWidth: 2.5,
        fill: false
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              const value = context.raw || 0;
              const percentage = ((value / total) * 100).toFixed(2);
              label += percentage + '%';
              return label;
            }
          }
        }
      }
    }
  });
}
