import * as S from './LineCard.style';
import { useState, useEffect, useRef, useMemo } from 'react';
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
    },
  },
};

interface LineChartProps {
  category: string;
}
const LineChart = ({ category }: LineChartProps) => {
  const chartRef = useRef<any>(null);
  const [legendItems, setLegendItems] = useState<any[]>([]);
  const [isHidden, setIsHidden] = useState<boolean[]>([]);

  useEffect(() => {
    if (chartRef.current) {
      const newHiddenStatus = chartRef.current.data.datasets.map(
        (_: number, i: number) => !!chartRef.current.getDatasetMeta(i)?.hidden,
      );
      setIsHidden(newHiddenStatus);
    }
  }, [category]);

  // 차트 옵션 (legend는 별도로 분리하므로 display: false)
  const LineOptions = useMemo<ChartOptions<'line'>>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'nearest',
        intersect: true,
      },
      scales: {
        x: { grid: { display: false } },
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
            size: 13,
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

  //   filter 값 바뀌면 리렌더링 되도록
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      setLegendItems(chart.legend?.legendItems || []);
    }
  }, [category]);

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
    <S.LineChartLayout>
      <S.LineChart ref={chartRef} options={LineOptions} data={LineData} />
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
    </S.LineChartLayout>
  );
};

export default LineChart;
