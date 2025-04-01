import * as S from './LineCard.style';
import { useState, useEffect, useRef, useMemo } from 'react';
import { hourFormatChanger } from '../../../utils/dataFormatter';
import { HourItem } from '@/types/chartType';
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
  ChartData,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title);

interface LineChartProps {
  category: string;
  chartData: HourItem[];
}
const LineChart = ({ chartData, category }: LineChartProps) => {
  const chartRef = useRef<any>(null);
  const [legendItems, setLegendItems] = useState<any[]>([]);

  const LineOptions = useMemo<ChartOptions<'line'>>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'nearest',
        intersect: false,
      },
      scales: {
        x: { grid: { display: false }, stacked: false },
        y: { grid: { display: true }, stacked: false, beginAtZero: true, min: 0 },
      },
      animation: {
        duration: 1500,
        easing: 'easeInOutQuad',
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#fff',
          bodyColor: 'black',
          titleColor: 'black',
          titleFont: {
            size: 0,
          },

          bodyFont: {
            size: 12,
          },
          borderColor: '#adadad',
          borderWidth: 1,
          shadowOffsetX: 2, // 그림자 관련 속성은 기본 툴팁에는 적용되지 않음
          shadowOffsetY: 2,
        },
      },
    }),
    [],
  );

  const LineData: ChartData<'line'> = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}`),
    datasets: hourFormatChanger(chartData, category),
  };
  useEffect(() => {
    if (chartRef.current) {
      setLegendItems(chartRef.current.legend?.legendItems || []);
    }
  }, [chartRef.current]);
  return (
    <S.LineChartLayout>
      <S.LineChart ref={chartRef} options={LineOptions} data={LineData} />
      <S.FixedLegendContainer>
        {legendItems
          .slice()
          .reverse()
          .map((item, index) => {
            return (
              <S.LegendItem key={index}>
                <S.LegendColorBox $bgcolor={item.fillStyle} />
                <span>{item.text}</span>
              </S.LegendItem>
            );
          })}
      </S.FixedLegendContainer>
    </S.LineChartLayout>
  );
};

export default LineChart;
