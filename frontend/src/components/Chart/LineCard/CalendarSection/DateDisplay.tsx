import * as S from './CalendarSection.style';

interface DateDisplayProps {
  content: Date;
}
const changeDateFormat = (date:Date) => {
  return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;
}
const DateDisplay = ({content}:DateDisplayProps) => {
  return (
    <S.DateDisplayLayout>
      <S.DisplaySpan>날짜</S.DisplaySpan>
      <S.VerticalLine />
      <S.CalendarIcon />
      <S.DisplaySpan>{changeDateFormat(content)}</S.DisplaySpan>
    </S.DateDisplayLayout>
  );
};

export default DateDisplay;

