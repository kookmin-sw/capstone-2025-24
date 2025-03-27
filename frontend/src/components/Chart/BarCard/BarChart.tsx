import * as S from './BarCard.style';
import { useRef, useEffect, useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { monthFormatChanger, dayFormatChanger } from '../../../hooks/dataFormatter';
import { BarMonthItem, BarDayItem } from '../../../mocks/BarData';

import {
  Chart as ChartJS,
  ChartData,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  Title,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Tooltip, Legend, Title);

interface BarChartProps {
  data: BarMonthItem[] | BarDayItem[];
  isMonthly: boolean;
}

const BarChart = ({ data, isMonthly }: BarChartProps) => {
  const chartRef = useRef<any>(null);
  const chartData: ChartData<'bar'> = {
    labels: isMonthly
      ? ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
      : Array.from({ length: data.length }, (_, i) => `${i + 1}일`),
    datasets: isMonthly ? monthFormatChanger(data as BarMonthItem[]) : dayFormatChanger(data as BarDayItem[]),
  };
  const [legendItems, setLegendItems] = useState<any[]>([]);
  const [isHidden, setIsHidden] = useState<boolean[]>([]);
  const containerWidth = isMonthly ? '100%' : `${(chartData.labels?.length || 0) * 40}px`;

  const BarOptions = useMemo<ChartOptions<'bar'>>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      scales: {
        x: { grid: { display: false }, stacked: true },
        y: { grid: { display: true }, stacked: true },
      },
      animation: { duration: 1500, easing: 'easeInOutQuad' },
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false }, // 기존 legend 숨기기
      },
    }),
    [],
  );

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      setLegendItems(chart.legend?.legendItems || []);
    }
  }, []);

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

  return (
    <S.BarChartLayout>
      <S.ChartScrollWrapper>
        <S.ChartCanvasWrapper $customWidth={isMonthly ? '100%' : containerWidth}>
          <Bar ref={chartRef} options={BarOptions} data={chartData} />
        </S.ChartCanvasWrapper>
      </S.ChartScrollWrapper>
      <S.FixedLegendContainer>
        {legendItems.map((item, index) => {
          return (
            <S.LegendItem key={index} onClick={() => handleLegendClick(index)} $isHidden={isHidden[index]}>
              <S.LegendColorBox $bgcolor={item.fillStyle} $isHidden={isHidden[index]} />
              <span>{item.text}</span>
            </S.LegendItem>
          );
        })}
      </S.FixedLegendContainer>
    </S.BarChartLayout>
  );
};

export default BarChart;
