import * as S from './LineCard.style';
import { LineData } from '../../../mocks/LineData';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  Title,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title);

const LineOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: { grid: { display: false }, stacked: true },
    y: { grid: { display: true }, stacked: true },
  },
  animation: {
    duration: 1500, // 애니메이션 지속 시간
    easing: 'easeInOutQuad', // 애니메이션 이징 함수
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    tooltip: {
        enabled: false,
    }
  },
};

const LineChart = () => {
  return <S.LineChartLayout>
    <S.LineChart options={LineOptions} data={LineData}/>
  </S.LineChartLayout>;
};

export default LineChart;
