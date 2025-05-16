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
        formatDay={(_locale, date) => date.toLocaleString('en', { day: 'numeric' })}
        formatShortWeekday={(_locale, date) => date.toLocaleDateString('en-US', { weekday: 'short' })}
        tileDisabled={({ date, view }) => {
          if (view === 'month') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
          }
          return false;
        }}
      />
    </S.CalenderComponentLayout>
  );
};

export default CalenderComponent;
