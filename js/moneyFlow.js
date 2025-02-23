const ctx = document.getElementById('money-flow-chart').getContext('2d');
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const incomeData = [40000, 30000, 35000, 15000, 10000, 38000];
const expenseData = [20000, 12000, 9000, 7000, 5000, 10000];

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Income',
      data: incomeData,
      backgroundColor: '#146EF5',
      barPercentage: 0.65,
      categoryPercentage: 0.9,
      barThickness: 12,
      borderRadius: 8,
    },
    {
      label: 'Expense',
      data: expenseData,
      backgroundColor: '#f6a74a',
      barPercentage: 0.65,
      categoryPercentage: 0.9,
      barThickness: 12,
      borderRadius: 8,
    },
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false } },
    y: {
      beginAtZero: true,
      grid: {
        color: '#ddd',
        borderDash: [4, 4],
        drawBorder: false,
      },
      ticks: {
        callback: function(value) {
          return '₦' + value.toLocaleString();
        },
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        borderRadius: 4,
      },
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.dataset.label || '';
          const value = context.parsed.y;
          return `${label}: ₦${value.toLocaleString()}`;
        },
      },
    },
  },
};
const canvas = document.getElementById('money-flow-chart');
canvas.parentNode.style.height = '300px';

new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options,
});