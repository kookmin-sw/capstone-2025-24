import * as S from './LineCard.style';
import CalendarSection from './CalendarSection/CalendarSection';
import { useState } from 'react';
import LineChart from './LineChart';
const LineCard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <S.LineCardLayout>
      <S.TitleDiv>
        <S.TitleP>시간대별 사건수</S.TitleP>
      </S.TitleDiv>
      <S.ContentDiv>
        <CalendarSection selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <LineChart/>
      </S.ContentDiv>
    </S.LineCardLayout>
  );
};

export default LineCard;
