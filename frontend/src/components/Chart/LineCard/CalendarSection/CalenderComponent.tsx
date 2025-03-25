import * as S from './CalendarSection.style';
import Calendar from 'react-calendar';

interface CalendarComponentProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}
const CalenderComponent = ({ selectedDate, setSelectedDate }: CalendarComponentProps) => {
  return (
    <S.CalenderComponentLayout>
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            setSelectedDate(value);
          }
        }}
        value={selectedDate}
        selectRange={false}
        calendarType="gregory"
        view="month"
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
        formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
        formatShortWeekday={(locale, date) => date.toLocaleDateString('en-US', { weekday: 'short' })}
      />
    </S.CalenderComponentLayout>
  );
};

export default CalenderComponent;
