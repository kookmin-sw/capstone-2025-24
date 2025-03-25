import * as S from './Filtering.style.ts';
import { useState } from 'react';
import { ko } from 'date-fns/locale';
import { Locale } from 'date-fns';
import DatePicker from 'react-datepicker';

interface DateFilteringProps {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const DateFiltering = ({ startDate, endDate, setStartDate, setEndDate }: DateFilteringProps) => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  return (
    <S.DateFilteringContainer>
      {/* 시작 날짜 */}
      <S.DatePickerWrapper className={`date-picker-wrapper ${isStartOpen ? 'open' : ''}`} isOpen={isStartOpen}>
        <S.CalendarIcon />
        <DatePicker
          className="custom-datepicker"
          locale={ko as Locale}
          dateFormat="yyyy.MM.dd"
          selected={startDate}
          onCalendarOpen={() => setIsStartOpen(true)}
          onCalendarClose={() => setIsStartOpen(false)}
          onChange={(date: Date | null) => {
            if (date instanceof Date) {
              setStartDate(date);
            }
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="시작 날짜"
        />
        <S.DownIcon isOpen={isStartOpen} />
      </S.DatePickerWrapper>

      {/* 종료 날짜 */}
      <S.DatePickerWrapper className={`date-picker-wrapper ${isEndOpen ? 'open' : ''}`} isOpen={isEndOpen}>
        <S.CalendarIcon />
        <DatePicker
          className="custom-datepicker"
          locale={ko as Locale}
          dateFormat="yyyy.MM.dd"
          selected={endDate}
          onCalendarOpen={() => setIsEndOpen(true)}
          onCalendarClose={() => setIsEndOpen(false)}
          onChange={(date: Date | null) => {
            if (date instanceof Date) {
              setEndDate(date);
            }
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date()}
          placeholderText="종료 날짜"
        />
        <S.DownIcon isOpen={isEndOpen} />
      </S.DatePickerWrapper>
    </S.DateFilteringContainer>
  );
};

export default DateFiltering;
