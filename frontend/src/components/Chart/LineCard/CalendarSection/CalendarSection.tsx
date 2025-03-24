import * as S from './CalendarSection.style';
import { useState } from 'react';
import CalenderComponent from './CalenderComponent';
import DateDisplay from './DateDisplay';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

const CalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  return (
    <S.CalendarSectionLayout>
      <DateDisplay />
      <CalenderComponent />
    </S.CalendarSectionLayout>
  );
};

export default CalendarSection;
