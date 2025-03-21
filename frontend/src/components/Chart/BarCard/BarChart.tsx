import * as S from './BarCard.style';
import { useFilterStore } from '../../../stores/filterStore';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  Title,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Tooltip, Legend, Title);

interface BarChartProps {
  data: number[];
}

const BarData1: ChartData<'bar'> = {
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

const labels = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

const BarData2: ChartData<'bar'> = {
  labels: labels,
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

const BarOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false, // 기본 비율 유지 X
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: false, // 세로선
      },
      stacked: true,
    },
    y: {
      grid: {
        display: true, //가로선
      },
      stacked: true,
    },
  },
  animation: {
    duration: 1500, // 애니메이션 지속 시간
    easing: 'easeInOutQuad', // 애니메이션 이징 함수
  },
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        color: 'black',
        borderRadius: 50,
        boxHeight: 5,
        boxWidth: 5,
        pointStyle: 'circle',
        usePointStyle: true,
        font: {
          size: 12,
          lineHeight: 2,
          weight: 'normal',
        },
      },
    },
  },
};

const BarChart = ({ data }: BarChartProps) => {
  const { filter, setFilter } = useFilterStore();
  return (
    <S.BarChartLayout>
      <Bar options={BarOptions} data={filter['month'] === '전체' || filter['month'] === '월' ? BarData1 : BarData2} />
    </S.BarChartLayout>
  );
};

export default BarChart;
