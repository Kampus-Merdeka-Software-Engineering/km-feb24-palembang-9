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

    // Calculate the total Count
    const total = data.reduce((sum, entry) => sum + parseFloat(entry.Count), 0);

    // Calculate percentages
    data.forEach(entry => {
      entry.Percentage = (parseFloat(entry.Count) / total * 100).toFixed(2);
    });

    createChart3(data);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });

function createChart3(data) {
  const labels = data.map(entry => entry.BOROUGH);
  const percentages = data.map(entry => entry.Percentage);

  // Generate random colors for each bar
  const colors = generateRandomColors(labels.length);

  new Chart(ctx3, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: 'Percentage of property sales',
        data: percentages,
        backgroundColor: colors, // Gunakan warna acak
        borderColor: '#0077B6',
        borderWidth: 2.5,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
              const value = context.formattedValue || 0;
              label += value + '%';
              return label;
            }
          }
        }
      }
    }
  });
}


// Function to generate random colors
function generateRandomColors(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
    colors.push(color);
  }
  return colors;
}
