import { ChartData } from "chart.js";

export const BarData1: ChartData<'bar'> = {
  labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  datasets: [
    {
      label: '화재',
      data: [120, 200, 150, 80, 250, 120, 200, 150, 80, 250, 10, 400],
      backgroundColor: ['#F08676'],
    },
    {
      label: '폭행',
      data: [120, 200, 150, 80, 250, 120, 200, 150, 80, 250, 10, 400],
      backgroundColor: ['#A7C972'],
    },
    {
      label: '쓰러짐',
      data: [120, 200, 150, 80, 250, 120, 200, 150, 80, 250, 10, 400],
      backgroundColor: ['#79A4E8'],
    },
    {
      label: '흉기난동',
      data: [120, 200, 150, 80, 250, 120, 200, 150, 80, 250, 10, 400],
      backgroundColor: ['#7ED1C1'],
    },
    {
      label: '군중밀집',
      data: [120, 200, 150, 80, 250, 120, 200, 150, 80, 250, 10, 400],
      backgroundColor: ['#EBC266'],
    },
  ],
};

export const BarData2: ChartData<'bar'> = {
  labels: Array.from({ length: 31 }, (_, i) => `${i + 1}일`),
  datasets: [
    {
      label: '화재',
      data: [1, 2, 3, 0, 2, 1, 3, 4, 2, 1, 0, 1, 2, 3, 1, 2, 2, 1, 3, 4, 2, 1, 0, 1, 2, 3, 4, 2, 1, 1, 0],
      backgroundColor: ['#F08676'],
    },
    {
      label: '폭행',
      data: [0, 1, 0, 2, 3, 2, 1, 2, 0, 1, 2, 3, 4, 1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 2, 1, 0, 1, 3, 2],
      backgroundColor: ['#A7C972'],
    },
    {
      label: '쓰러짐',
      data: [2, 1, 1, 1, 1, 0, 0, 2, 1, 3, 4, 2, 1, 0, 0, 2, 3, 4, 1, 2, 3, 2, 1, 0, 1, 2, 3, 1, 1, 0, 2],
      backgroundColor: ['#79A4E8'],
    },
    {
      label: '흉기난동',
      data: [0, 0, 1, 1, 0, 2, 1, 1, 0, 0, 2, 3, 1, 2, 1, 1, 0, 0, 2, 1, 0, 0, 1, 2, 1, 1, 0, 1, 2, 1, 1],
      backgroundColor: ['#7ED1C1'],
    },
    {
      label: '군중밀집',
      data: [3, 4, 5, 3, 4, 3, 2, 3, 4, 5, 3, 4, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4],
      backgroundColor: ['#EBC266'],
    },
  ],
};