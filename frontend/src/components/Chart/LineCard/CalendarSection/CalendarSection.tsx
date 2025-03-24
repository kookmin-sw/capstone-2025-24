import * as S from './CalendarSection.style';
import CalenderComponent from './CalenderComponent';

const CalendarSection = () => {
  // 요기에 상단컴포넌트, 캘린더가 들어올 거예요요
  return <S.CalendarSectionLayout>
    <CalenderComponent/>
  </S.CalendarSectionLayout>;
};

export default CalendarSection;
