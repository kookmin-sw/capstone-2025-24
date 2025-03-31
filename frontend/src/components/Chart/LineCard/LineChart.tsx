import * as S from './LineCard.style';
import { useState, useEffect, useRef, useMemo } from 'react';
import { hourFormatChanger } from '../../../utils/dataFormatter';
import { HourItem } from '../../../mocks/LineData';
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
const LineChart = ({ category, chartData }: LineChartProps) => {
  const chartRef = useRef<any>(null);
  const [legendItems, setLegendItems] = useState<any[]>([]);
  const [isHidden, setIsHidden] = useState<boolean[]>([]);

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
        y: { grid: { display: true }, stacked: false },
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

  // legend 배치
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      setLegendItems(chart.legend?.legendItems || []);
    }
  }, [category]);

  const handleLegendClick = (index: number) => {
    if (!chartRef.current) return;

    const chart = chartRef.current;
    const isOnlyOneVisible = chart.data.datasets.every((_: number, i: number) => {
      const meta = chart.getDatasetMeta(i);
      return i === index ? !meta.hidden : meta.hidden;
    });

    chart.data.datasets.forEach((_: number, i: number) => {
      const meta = chart.getDatasetMeta(i);
      if (isOnlyOneVisible) {
        meta.hidden = false;
      } else {
        meta.hidden = i !== index;
      }
    });

    chart.update();
    setIsHidden(chart.data.datasets.map((_: number, i: number) => !!chart.getDatasetMeta(i)?.hidden));
  };

  const LineData: ChartData<'line'> = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}`),
    datasets: hourFormatChanger(chartData),
  };
  return (
    <S.LineChartLayout>
      <S.LineChart ref={chartRef} options={LineOptions} data={LineData} />
      <S.FixedLegendContainer>
        {legendItems.reverse().map((item, index) => {
          return (
            <S.LegendItem key={index} onClick={() => handleLegendClick(index)} $isHidden={isHidden[index]}>
              <S.LegendColorBox $bgcolor={item.fillStyle} $isHidden={isHidden[index]} />
              <span>{item.text}</span>
            </S.LegendItem>
          );
        })}
      </S.FixedLegendContainer>
    </S.LineChartLayout>
  );
};

export default LineChart;
