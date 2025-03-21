import * as S from './Filtering.style.ts';
import { useState } from 'react';
import { ko } from 'date-fns/locale';


const DateFiltering = () => {
  const [startDate, setStartDate] = useState<Date>(new Date('2024/01/01'));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  return (
    <S.DateFilteringContainer>
      <S.DatePickerWrapper className={`date-picker-wrapper ${isStartOpen ? 'open' : ''}`} isOpen={isStartOpen}>
        <S.CalendarIcon onClick={() => setIsStartOpen(!isStartOpen)} />
        <S.StyledDatePicker
          locale={ko}
          dateFormat="yyyy.MM.dd"
          selected={startDate}
          onInputClick={()=>setIsStartOpen(!isStartOpen)}
          onChange={(date: Date | null) => {
            if (date) {
              setStartDate(date);
              setIsStartOpen(false);
            }
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="시작 날짜"
          open={isStartOpen} // 상태로 열림/닫힘 관리
        />
        <S.DownIcon onClick={() => setIsStartOpen(!isStartOpen)} isOpen={isStartOpen}/>
      </S.DatePickerWrapper>

      <S.DatePickerWrapper className={`date-picker-wrapper ${isEndOpen ? 'open' : ''}`} isOpen={isEndOpen}>
        <S.CalendarIcon onClick={() => setIsEndOpen(!isEndOpen)} />
        <S.StyledDatePicker
          locale={ko}
          dateFormat="yyyy.MM.dd"
          selected={endDate}
          onInputClick={()=>setIsEndOpen(!isEndOpen)}
          onChange={(date: Date | null) => {
            if (date) {
              setEndDate(date);
              setIsEndOpen(false); // 날짜 선택 시 닫힘
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
        <S.DownIcon onClick={() => setIsEndOpen(!isEndOpen)} isOpen={isEndOpen}/>
      </S.DatePickerWrapper>
    </S.DateFilteringContainer>
  );
};

export default DateFiltering;
