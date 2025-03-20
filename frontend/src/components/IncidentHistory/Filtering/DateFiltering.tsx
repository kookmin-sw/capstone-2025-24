import * as S from './style.ts';
import { useState } from 'react';
import { ko } from 'date-fns/locale';

const DateFiltering = () => {
  const [startDate, setStartDate] = useState<Date>(new Date('2014/02/08'));
  const [endDate, setEndDate] = useState<Date>(new Date());
  return (
    <S.DateFilteringContainer>
      <S.DatePickerWrapper>
        <S.CalendarIcon />
        <S.StyledDatePicker
          locale={ko} // 한국어 설정
          dateFormat="yyyy.MM.dd" // 날짜 포멧
          selected={startDate}
          onChange={(date: Date) => setStartDate(date ?? new Date('2014/02/08'))}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="시작 날짜"
        />
        <S.DownIcon />
      </S.DatePickerWrapper>

      <S.DatePickerWrapper>
        <S.CalendarIcon />
        <S.StyledDatePicker
          locale={ko}
          dateFormat="yyyy.MM.dd"
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date ?? new Date())}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date()}
          placeholderText="종료 날짜"
        />
        <S.DownIcon />
      </S.DatePickerWrapper>
    </S.DateFilteringContainer>
  );
};

export default DateFiltering;
