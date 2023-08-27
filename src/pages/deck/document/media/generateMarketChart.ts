import Chart from 'chart.js/auto';

export const generateMarketChart = (rootId: string, [tam, sam, som]: [number, number, number], callback: (data: string) => void) => {
  const chart = new Chart((document.getElementById(rootId) as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D, {
    type: 'bar',
    data: {
      labels: ['SAM', 'SOM'],
      datasets: [
        {
          label: 'Сравнение SAM и SOM',
          data: [sam, som],
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
          setTimeout(() => {
            const image = chart?.toBase64Image() || 'data:image/png;base64,i';
            callback(image);
          }, 1000);
        },
      },
    },
  })
}