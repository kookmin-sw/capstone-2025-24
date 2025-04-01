import * as S from './BarCard.style';
import { useRef, useEffect, useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { monthFormatChanger, dayFormatChanger } from '@/utils/dataFormatter';
import { BarMonthItem, BarDayItem } from '@/types/chartType';
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
  LegendItem,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Tooltip, Legend, Title);

interface BarChartProps {
  data: BarMonthItem[] | BarDayItem[];
  isMonthly: boolean;
  isVisible: boolean;
}

const BarChart = ({ data, isMonthly, isVisible }: BarChartProps) => {
  const chartRef = useRef<ChartJS<'bar'> | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseLeave = () => (isDragging.current = false);

  const onMouseUp = () => (isDragging.current = false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const chartData: ChartData<'bar'> = {
    labels: isMonthly
      ? ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
      : Array.from({ length: data.length }, (_, i) => `${i + 1}일`),
    datasets: isMonthly ? monthFormatChanger(data as BarMonthItem[]) : dayFormatChanger(data as BarDayItem[]),
  };
  const [legendItems, setLegendItems] = useState<LegendItem[]>([]);
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
      animation: isVisible ? { duration: 1500, easing: 'easeInOutQuad' } : { duration: 0 },
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
      },
    }),
    [],
  );

  useEffect(() => {
    if (chartRef.current) {
      setLegendItems(chartRef.current.legend?.legendItems || []);
    }
  }, [chartRef.current]);

  return (
    <S.BarChartLayout>
      <S.ChartScrollWrapper
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <S.ChartCanvasWrapper $customWidth={isMonthly ? '100%' : containerWidth}>
          <Bar ref={chartRef} options={BarOptions} data={chartData} />
        </S.ChartCanvasWrapper>
      </S.ChartScrollWrapper>
      <S.FixedLegendContainer>
        {legendItems
          .slice()
          .reverse()
          .map((item, index) => {
            return (
              <S.LegendItem key={index}>
                <S.LegendColorBox $bgcolor={item.fillStyle as string} />
                <span>{item.text}</span>
              </S.LegendItem>
            );
          })}
      </S.FixedLegendContainer>
    </S.BarChartLayout>
  );
};

export default BarChart;
