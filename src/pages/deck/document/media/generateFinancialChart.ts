import Chart from 'chart.js/auto';

export const generateFinancialChart = (rootId: string, [cac, ltv]: [number, number], callback: (data: string) => void) => {
  const chart = new Chart((document.getElementById(rootId) as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D, {
    type: 'bar',
    data: {
      labels: ['LTV', 'CAC'],
      datasets: [
        {
          label: 'Сравнение LTV (Lifetime Value) и CAC (Customer Acquisition Cost)',
          data: [ltv, cac],
          backgroundColor: 'rgba(255, 99, 132, 0.3)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      aspectRatio: 2,
      animation: {
        onComplete: function () {
          callback(chart.toBase64Image());
        },
      },
    },
  })
}