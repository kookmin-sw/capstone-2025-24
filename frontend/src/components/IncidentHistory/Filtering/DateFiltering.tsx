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
      <S.DatePickerWrapper className={`date-picker-wrapper ${isStartOpen ? 'open' : ''}`} isOpen={isStartOpen}>
        <S.CalendarIcon onClick={() => setIsStartOpen(!isStartOpen)} />
        <DatePicker
          className="custom-datepicker"
          locale={ko as Locale}
          dateFormat="yyyy.MM.dd"
          selected={startDate}
          onInputClick={() => setIsStartOpen(!isStartOpen)}
          onChange={(date: Date | null) => {
            if (date instanceof Date) {
              setStartDate(date);
              setIsStartOpen(false);
            }
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="시작 날짜"
          open={isStartOpen}
        />
        <S.DownIcon onClick={() => setIsStartOpen(!isStartOpen)} isOpen={isStartOpen} />
      </S.DatePickerWrapper>

      <S.DatePickerWrapper className={`date-picker-wrapper ${isEndOpen ? 'open' : ''}`} isOpen={isEndOpen}>
        <S.CalendarIcon onClick={() => setIsEndOpen(!isEndOpen)} />
        <DatePicker
          className="custom-datepicker"
          locale={ko as Locale}
          dateFormat="yyyy.MM.dd"
          selected={endDate}
          onInputClick={() => setIsEndOpen(!isEndOpen)}
          onChange={(date: Date | null) => {
            if (date instanceof Date) {
              setEndDate(date);
              setIsEndOpen(false);
            }
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date()}
          placeholderText="종료 날짜"
          open={isEndOpen} // 상태로 열림/닫힘 관리
        />
        <S.DownIcon onClick={() => setIsEndOpen(!isEndOpen)} isOpen={isEndOpen} />
      </S.DatePickerWrapper>
    </S.DateFilteringContainer>
  );
};

export default DateFiltering;
