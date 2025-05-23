import * as S from './Filtering.style.ts';
import { useState, useRef } from 'react';
import { ko } from 'date-fns/locale';
import { Locale } from 'date-fns';
import DatePicker from 'react-datepicker';
import useOutsideClick from '@/hooks/useOutsideClick.ts';

interface DateFilteringProps {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const DateFiltering = ({ startDate, endDate, setStartDate, setEndDate }: DateFilteringProps) => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  useOutsideClick(startRef, () => setIsStartOpen(false));
  useOutsideClick(endRef, () => setIsEndOpen(false));

  const handleDatePickerToggle = (
    e: React.MouseEvent,
    setCurrentOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setOtherOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const target = e.target as HTMLElement;
    if (document.querySelector('.react-datepicker-popper')?.contains(target)) return;

    setCurrentOpen((prev) => !prev);
    if (setOtherOpen) setOtherOpen(false);
  };

  return (
    <>
      <S.DateFilteringContainer>
        <S.InfoP>시작 날짜</S.InfoP>
        {/* 시작 날짜 */}
        <S.DatePickerWrapper
          ref={startRef}
          className={`date-picker-wrapper ${isStartOpen ? 'open' : ''}`}
          onClick={(e) => handleDatePickerToggle(e, setIsStartOpen, setIsEndOpen)}
          $isOpen={isStartOpen}
        >
          <S.CalendarIcon />
          <DatePicker
            className="custom-datepicker"
            locale={ko as Locale}
            dateFormat="yyyy.MM.dd"
            selected={startDate}
            onChange={(date: Date | null) => {
              if (date instanceof Date) {
                setStartDate(date);
              }
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            open={isStartOpen}
          />
          <S.DownIcon $isOpen={isStartOpen} />
        </S.DatePickerWrapper>
      </S.DateFilteringContainer>

      {/* 종료 날짜 */}
      <S.DateFilteringContainer>
      <S.InfoP>종료 날짜</S.InfoP>
      <S.DatePickerWrapper
        ref={endRef}
        className={`date-picker-wrapper ${isEndOpen ? 'open' : ''}`}
        onClick={(e) => handleDatePickerToggle(e, setIsEndOpen, setIsStartOpen)}
        $isOpen={isEndOpen}
      >
        <S.CalendarIcon />
        <DatePicker
          className="custom-datepicker"
          locale={ko as Locale}
          dateFormat="yyyy.MM.dd"
          selected={endDate}
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
          open={isEndOpen}
        />
        <S.DownIcon $isOpen={isEndOpen} />
      </S.DatePickerWrapper>
    </S.DateFilteringContainer>
    </>
  );
};

export default DateFiltering;
