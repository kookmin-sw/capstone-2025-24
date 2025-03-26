import * as S from './BarCard.style';
import BarChart from './BarChart';
import { useState, useEffect } from 'react';
import BarFilter from './BarFilter/BarFilter';
import { BarMonthData, BarMonthItem, BarDayData, BarDayItem } from '../../../mocks/BarData';
import { useFilterStore } from '../../../stores/filterStore';
const BarCard = () => {
  const { filter } = useFilterStore();
  const [monthData, setMonthData] = useState<BarMonthItem[]>([]);
  const [dayData, setDayData] = useState<BarDayItem[]>([]);

  useEffect(() => {
    // filter 값 바뀔 때마다 api get
    if (filter.month === '전체' || filter.month === '월') {
      setMonthData(BarMonthData);
    } else {
      setDayData(BarDayData);
    }
  }, [filter]);
  return (
    <S.BarCardLayout>
      <S.TitleDiv>
        <S.TitleP>일 ∙ 월별 사건수</S.TitleP>
        <BarFilter />
      </S.TitleDiv>
      <BarChart
        data={filter.month === '전체' || filter.month === '월' ? monthData : dayData}
        isMonthly={filter.month === '전체' || filter.month === '월'}
      />
    </S.BarCardLayout>
  );
};

export default BarCard;
