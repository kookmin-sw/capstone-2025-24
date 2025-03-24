import * as S from './CalendarSection.style';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

const CalenderComponent = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);
  return (
    <S.CalenderComponentLayout>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        calendarType="gregory"
        view="month"
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
        formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
      />
    </S.CalenderComponentLayout>
  );
};

export default CalenderComponent;
