import Chart from 'chart.js/auto';
import format from 'date-fns/format';
import addYears from 'date-fns/addYears';

export const generateGrowChart = (rootId: string, [company_value, future_value, date]: [number, number, Date], callback: (data: string) => void) => {
  const chart = new Chart((document.getElementById(rootId) as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D, {
    type: 'line',
    data: {
      labels: [
        format(new Date(), 'dd.MM.yyyy'),
        format(date ? new Date(date) : addYears(new Date(), 1), 'dd.MM.yyyy')],
      datasets: [
        {
          label: 'Рост после привлечения инвестиций',
          data: [company_value, future_value],
          fill: false,
          borderColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1
        },
      ],
    },
    options: {
      // indexAxis: 'y',
      aspectRatio: 2,
      animation: {
        onComplete: function () {
          callback(chart.toBase64Image());
        },
      },
    },
  })
}