import * as S from './BarCard.style';
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

const BarData: ChartData<'bar'> = {
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
  return (
    <S.BarChartLayout>
      <Bar options={BarOptions} data={BarData} />
    </S.BarChartLayout>
  );
};

export default BarChart;
