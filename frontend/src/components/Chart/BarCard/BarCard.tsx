import * as S from './BarCard.style';
import BarChart from './BarChart';
import { useState, useEffect, useRef } from 'react';
import { getPatePerYearMonth } from '@/apis/ChartApi';
import BarFilter from './BarFilter/BarFilter';
import { BarMonthItem, BarDayItem } from '@/types/chartType';
import { useFilterStore } from '../../../stores/filterStore';
import { useScrollObserver } from '../../../hooks/useScrollObserver';
const BarCard = () => {
  const { filter } = useFilterStore();
  const [monthData, setMonthData] = useState<BarMonthItem[]>([]);
  const [dayData, setDayData] = useState<BarDayItem[]>([]);
  const [inviewPort, setInviewPort] = useState<boolean>(false);
  const element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const monthParam = filter.month === '전체' || filter.month === '월' ? undefined : filter.month;
      const data = await getPatePerYearMonth(filter.year, monthParam, filter.category);
      if (monthParam) {
        setDayData(data.applications);
      } else {
        setMonthData(data.applications);
      }
    };

    fetchChartData();
  }, [filter]);

  useEffect(() => {
    useScrollObserver({ setInviewPort, element });
  });

  return (
    <S.BarCardLayout ref={element}>
      <S.TitleDiv>
        <S.TitleP>일 ∙ 월별 사건수</S.TitleP>
        <BarFilter />
      </S.TitleDiv>
      {inviewPort && (
        <BarChart
          data={filter.month === '전체' || filter.month === '월' ? monthData : dayData}
          isMonthly={filter.month === '전체' || filter.month === '월'}
          isVisible={inviewPort}
        />
      )}
    </S.BarCardLayout>
  );
};

export default BarCard;
