import * as S from './CalendarSection.style';
import CalenderComponent from './CalenderComponent';
import DateDisplay from './DateDisplay';

interface CalendarSectionProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}


const CalendarSection = ({ selectedDate, setSelectedDate }: CalendarSectionProps) => {
  return (
    <S.CalendarSectionLayout>
      <DateDisplay content={selectedDate}/>
      <CalenderComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
    </S.CalendarSectionLayout>
  );
};

export default CalendarSection;
