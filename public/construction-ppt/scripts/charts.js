// ============================================
// BuildIQ — Chart.js Configurations
// Survey charts and data visualizations
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if Chart.js is loaded
  if (typeof Chart !== 'undefined') {
    initSurveyChart();
    initToolsChart();
  } else {
    console.warn('Chart.js not loaded. Data visualizations will not appear.');
  }
});

// Common chart options for dark theme
const chartColors = {
  yellow: '#F5A623',
  orange: '#E8642C',
  blue: '#3B82F6',
  green: '#22C55E',
  red: '#EF4444',
  text: '#A1A1AA',
  grid: 'rgba(255, 255, 255, 0.05)'
};

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: chartColors.text,
        font: { family: "'Inter', sans-serif", size: 12 }
      }
    }
  }
};

function initSurveyChart() {
  const ctx = document.getElementById('surveyChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Face Delays', 'Struggle Tracking', 'Experience Wastage'],
      datasets: [{
        data: [78, 64, 71],
        backgroundColor: [
          chartColors.red,
          chartColors.orange,
          chartColors.yellow
        ],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      ...commonOptions,
      cutout: '75%',
      plugins: {
        ...commonOptions.plugins,
        tooltip: {
          callbacks: {
            label: function(context) {
              return ' ' + context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }
    }
  });
}

function initToolsChart() {
  const ctx = document.getElementById('toolsChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['WhatsApp', 'Excel', 'Phone Calls', 'Paper Reports', 'Project Mgmt Software'],
      datasets: [{
        label: '% of Professionals Using',
        data: [85, 72, 90, 58, 22],
        backgroundColor: chartColors.blue,
        borderRadius: 4
      }]
    },
    options: {
      ...commonOptions,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: chartColors.grid },
          ticks: { color: chartColors.text, callback: (val) => val + '%' }
        },
        x: {
          grid: { display: false },
          ticks: { color: chartColors.text }
        }
      }
    }
  });
}
