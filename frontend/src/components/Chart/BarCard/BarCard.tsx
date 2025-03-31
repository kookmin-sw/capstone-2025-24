import * as S from './BarCard.style';
import { EVENT_CATEGORY } from '@/constants/EventCategory';
import BarChart from './BarChart';
import { useState, useEffect, useRef } from 'react';
import { getDataPerYearMonth } from '@/apis/ChartApi';
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

  const getEnglishCategory = (koreanCategory: string): string | undefined => {
    return Object.keys(EVENT_CATEGORY).find((key) => EVENT_CATEGORY[key] === koreanCategory);
  };
  useEffect(() => {
    const fetchChartData = async () => {
      const monthParam = filter.month === '전체' || filter.month === '월' ? undefined : filter.month;
      const yearParam = filter.year === '전체' ? undefined : filter.year;
      const categoryParam = filter.category === '전체' ? undefined : getEnglishCategory(filter.category);
      const data = await getDataPerYearMonth(yearParam, monthParam, categoryParam);
      console.log("Data:", data);
      if (monthParam) {
        setDayData(data);
      } else {
        setMonthData(data);
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
