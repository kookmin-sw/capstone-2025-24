import { ChartData } from 'chart.js';

export const LineData: ChartData<'line'> = {
  labels: Array.from({ length: 24 }, (_, i) => `${i}`),
  datasets: [
    {
      label: '화재',
      data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 26)),
      backgroundColor: ['#F08676'],
      borderColor: ['#F08676'],
      borderWidth: 2,
      pointRadius: 1.5,
      pointHoverRadius: 1.5,
    },
    {
      label: '폭행',
      data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 26)),
      backgroundColor: ['#A7C972'],
      borderColor: ['#A7C972'],
      borderWidth: 2,
      pointRadius: 1.5,
      pointHoverRadius: 1.5,
    },
    {
      label: '쓰러짐',
      data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 26)),
      backgroundColor: ['#79A4E8'],
      borderColor: ['#79A4E8'],
      borderWidth: 2,
      pointRadius: 1.5,
      pointHoverRadius: 1.5,
    },
    {
      label: '흉기난동',
      data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 26)),
      backgroundColor: ['#7ED1C1'],
      borderColor: ['#7ED1C1'],
      borderWidth: 2,
      pointRadius: 1.5,
      pointHoverRadius: 1.5,
    },
    {
      label: '군중밀집',
      data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 26)),
      backgroundColor: ['#EBC266'],
      borderColor: ['#EBC266'],
      borderWidth: 2,
      pointRadius: 1.5,
      pointHoverRadius: 1.5,
    },
  ],
};
