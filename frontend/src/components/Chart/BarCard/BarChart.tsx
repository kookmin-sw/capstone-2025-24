import * as S from './BarCard.style';
import { useRef, useEffect, useState, useMemo } from 'react';
import { useFilterStore } from '../../../stores/filterStore';
import { Bar } from 'react-chartjs-2';
import { BarData1, BarData2 } from '../../../mocks/BarData';
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
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Tooltip, Legend, Title);

interface BarChartProps {
  data: number[];
}

const BarChart = ({ data }: BarChartProps) => {
  const chartRef = useRef<any>(null);
  const [legendItems, setLegendItems] = useState<any[]>([]);
  const [isHidden, setIsHidden] = useState<boolean[]>([]);
  const { filter } = useFilterStore();
  const isMonthly = filter.month === '전체' || filter.month === '월';
  const chartData = isMonthly ? BarData1 : BarData2;
  const containerWidth = isMonthly ? '100%' : `${(chartData.labels?.length || 0) * 40}px`;
  
  useEffect(() => {
    if (chartRef.current) {
      const newHiddenStatus = chartRef.current.data.datasets.map(
        (_: number, i: number) => !!chartRef.current.getDatasetMeta(i)?.hidden,
      );
      setIsHidden(newHiddenStatus);
    }
  }, [filter, chartData]);

  // 차트 옵션 (legend는 별도로 분리하므로 display: false)
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
    }),[]);

  // filter 값 바뀌면 리렌더링 되도록
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      setLegendItems(chart.legend?.legendItems || []);
    }
  }, [filter, chartData]);

  // legend 클릭 이벤트 핸들러
  const handleLegendClick = (index: number) => {
    if (!chartRef.current) return;

    const chart = chartRef.current;

    // 현재 선택된 데이터셋이 모두 숨겨졌는지 확인
    const isOnlyOneVisible = chart.data.datasets.every((_: number, i: number) => {
      const meta = chart.getDatasetMeta(i);
      return i === index ? !meta.hidden : meta.hidden;
    });

    // 클릭한 항목만 활성화 / 다른 항목은 비활성화
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
