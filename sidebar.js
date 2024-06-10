//SIDEBAR

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
    if (!sidebarOpen) { // Periksa jika sidebar belum terbuka
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true; // Setel variabel menjadi true karena sidebar sekarang terbuka
    }
}

function closeSidebar() {
    if (sidebarOpen) { // Periksa jika sidebar sudah terbuka
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false; // Setel variabel menjadi false karena sidebar sekarang tertutup
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Data dummy untuk chart
    const dataProducts = [10, 20, 30, 40, 50];
    const dataPurchaseOrder = [5, 15, 25, 35, 45];
  
    // Fungsi untuk membuat chart
    function createChart(chartId, data, label, color) {
      const ctx = document.getElementById(chartId).getContext('2d');
      return new Chart(ctx, {
        type: 'line', // Tipe chart bisa diubah sesuai kebutuhan
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Label untuk sumbu X
          datasets: [{
            label: label,
            data: data,
            fill: false,
            borderColor: color,
            tension: 0.1
          }]
        },
        options: {
          responsive: true, // Menambahkan responsivitas
          maintainAspectRatio: false, // Menonaktifkan rasio aspek default
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false // Menonaktifkan legenda jika tidak diperlukan
            }
          },
          layout: {
            padding: {
              right: 20 // Menambahkan padding di sisi kanan
            }
          },
          elements: {
            line: {
              tension: 0.4 // Mengurangi ketegangan garis
            },
            point: {
              radius: 0 // Menghilangkan titik data
            }
          }
        }
      });
    }
  
    // Membuat chart untuk masing-masing kategori
    createChart('productsChart', dataProducts, 'Products', 'rgb(75, 192, 192)');
    createChart('purchaseOrderChart', dataPurchaseOrder, 'Purchase Order', 'rgb(255, 205, 86)');
  });

  var loader;

  function loadNow(opacity) {
      if (opacity === undefined) {
          opacity = 1;
      }
  
      if (opacity <= 0) {
          displayContent();
      } else {
          loader.style.opacity = opacity;
          window.setTimeout(function() {
              loadNow(opacity - 0.05)
          }, 100);
      }
  }
  
  function displayContent() {
      loader.style.display = 'none';
      document.getElementById('content').style.display = 'block';
  }
  
  document.addEventListener("DOMContentLoaded", function() {
      loader = document.getElementById('loader');
      loadNow(1); // Berikan opacity awal
  })

  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah pengiriman formulir default
        alert('Sudah submit');
        form.reset(); // Mengosongkan formulir setelah submit
        window.location.href = 'index.html'; // Mengarahkan ke index.html
    });
});

