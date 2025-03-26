import * as S from './DoughnutCard.style';
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
import LabelBox from './LabelBox';
import { CategoryItem } from '../../../mocks/DoughnutData';
import { categoryFormatChanger } from '../../../hooks/dataFormatter';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Tooltip, Legend, Title);

// data 합합
const getTotal = (chart: any) => {
  return chart.data.datasets[0].data.reduce((acc: number, value: number) => acc + value, 0);
};

// 가운데 총계 text 추가를 위한 plugin
const textCenterPlugin = {
  id: 'textCenter',
  beforeDraw: (chart: any) => {
    const { width, height } = chart;
    const ctx = chart.ctx;

    // 작은 텍스트
    ctx.font = `700 12px sans-serif`;
    ctx.fillStyle = '#8D8D8D';
    ctx.textBaseline = 'middle';
    const labelText = '총계';
    const labelX = Math.round((width - ctx.measureText(labelText).width) / 2);
    const labelY = height / 2 - 10; // 숫자보다 위쪽으로 조정

    ctx.fillText(labelText, labelX, labelY);
    ctx.save();
    // 숫자 텍스트
    ctx.font = `700 20px sans-serif`;
    ctx.fillStyle = '#000000';
    const totalText = `${getTotal(chart)}`;
    const totalX = Math.round((width - ctx.measureText(totalText).width) / 2);
    const totalY = height / 2 + 7;

    ctx.fillText(totalText, totalX, totalY);
    ctx.save();
  },
};

// 차트 옵션
const DoughnutOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '47%',
  interaction: {
    // mode: 'index',
    intersect: true,
  },
  animation: {
    duration: 1500,
    easing: 'easeInOutQuad',
  },
  plugins: {
    legend: {
      display: false,
    },
    textCenter: {},
    tooltip: {
      enabled: false,
    },
  },
} as unknown as ChartOptions<'doughnut'>;

interface LegendItem {
  text: string;
  color: string;
}

interface DoughnutChartProps {
  data: CategoryItem;
  legendItems: LegendItem[];
}

const DoughnutChart = ({ data, legendItems }: DoughnutChartProps) => {
  // 차트 data
  const DoughnutData: ChartData<'doughnut'> = {
    labels: legendItems.map(it => it.text),
    datasets: [
      {
        label: '사건 수',
        data: categoryFormatChanger(data),
        backgroundColor: legendItems.map(it => it.color),
        hoverOffset: 5,
      },
    ],
  };

  return (
    <S.DoughnutChartLayout>
      <S.GraphDiv>
        <S.DoughnutChart data={DoughnutData} options={DoughnutOptions} plugins={[textCenterPlugin]} />
      </S.GraphDiv>
      <LabelBox data={categoryFormatChanger(data)} legendItems={legendItems}/>
    </S.DoughnutChartLayout>
  );
};

export default DoughnutChart;
