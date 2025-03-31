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
import { useEffect, useRef } from 'react';
import LabelBox from './LabelBox';
import { DataItem } from '@/types/chartType';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Tooltip, Legend, Title);

// data 합
const getTotal = (chart: ChartJS) => {
  const data = chart.data.datasets[0].data as number[];
  return data.reduce((acc, value) => acc + value, 0);
};

// 가운데 총계 text 추가를 위한 plugin
const textCenterPlugin = {
  id: 'textCenter',
  beforeDraw: (chart: ChartJS) => {
    const { width, height } = chart;
    const ctx = chart.ctx;

    // 작은 텍스트
    ctx.font = `700 12px sans-serif`;
    ctx.fillStyle = '#8D8D8D';
    ctx.textBaseline = 'middle';
    const labelText = '총계';
    const labelX = Math.round((width - ctx.measureText(labelText).width) / 2);
    const labelY = height / 2 - 10;

    ctx.fillText(labelText, labelX, labelY);
    ctx.save();
    // 큰 텍스트
    ctx.font = `700 20px sans-serif`;
    ctx.fillStyle = '#000000';
    const totalText = `${getTotal(chart)}`;
    const totalX = Math.round((width - ctx.measureText(totalText).width) / 2);
    const totalY = height / 2 + 7;

    ctx.fillText(totalText, totalX, totalY);
    ctx.save();
  },
};

interface DoughnutChartProps {
  data: DataItem[] | undefined;
  isVisible: boolean;
  type: string;
}

const DoughnutChart = ({ data, isVisible, type }: DoughnutChartProps) => {
  const chartRef = useRef<ChartJS<'doughnut'> | null>(null);
  const DoughnutData: ChartData<'doughnut'> = {
    labels: data?.map((it) => it.text),
    datasets: [
      {
        label: '사건 수',
        data: data?.map((it) => it.count) || [1, 1, 1, 1, 1],
        backgroundColor: data?.map((it) => it.color),
      },
    ],
  };

  // 차트 옵션
  const DoughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '47%',
    interaction: {
      intersect: true,
    },
    animation: isVisible
      ? {
          duration: 1500,
          easing: 'easeInOutQuad',
        }
      : { duration: 0 },
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

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [data, isVisible]);
  return (
    <S.DoughnutChartLayout>
      <S.GraphDiv>
        <S.DoughnutChart ref={chartRef} data={DoughnutData} options={DoughnutOptions} plugins={[textCenterPlugin]} />
      </S.GraphDiv>
      <LabelBox data={data} type={type}/>
    </S.DoughnutChartLayout>
  );
};

export default DoughnutChart;
