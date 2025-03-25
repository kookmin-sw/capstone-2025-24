import * as S from './CalendarSection.style';

interface DateDisplayProps {
  content: Date;
}
const changeDateFormat = (date:Date) => {
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
}
const DateDisplay = ({content}:DateDisplayProps) => {
  return (
    <S.DateDisplayLayout>
      날짜
      <S.VerticalLine />
      <S.CalendarIcon />
      <S.DisplaySpan>{changeDateFormat(content)}</S.DisplaySpan>
    </S.DateDisplayLayout>
  );
};

export default DateDisplay;

DateDisplay;
