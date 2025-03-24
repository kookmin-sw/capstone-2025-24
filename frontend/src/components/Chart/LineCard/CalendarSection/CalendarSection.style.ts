import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { FaRegCalendar } from 'react-icons/fa6';
// CalendarSection.tsx -------------------------------//
export const CalendarSectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 255px;
  height: 100%;
`;

// CalenderComponent.tsx -----------------------------------//
export const CalenderComponentLayout = styled.div`
  width: 252px;
  height: 260px;

  // 최상단 div
  .react-calendar {
    width: 252px;
    height: 270px;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--gray400);
    padding-top: 10px;
  }

  // 네비게이션 배치 설정
  .react-calendar__navigation {
    height: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 0;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    min-height: 20px;
    font-weight: 700;
    font-size: 11.5px;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:hover {
    background: none;
    box-shadow: none;
    cursor: pointer;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 500;
    font-size: 8px;
    color: var(--gray500);
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
    margin: 0 24px;
  }

  .react-calendar__navigation__arrow {
    color: var(--gray500);
  }

  .react-calendar__tile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: white;
    font-size: 13px;
    font-weight: 600;
    color: var(--gray800);
  }

  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: var(--primary800);
    border-radius: 50%;
    color: white;
  }
  // 날짜 버튼 hover
  .react-calendar__tile--hover {
    background-color: var(--gray400);
  }

  // 선택 되어있는 tile hover
  .react-calendar__tile:active:hover {
    background: var(--primary800);
    color: white;
  }

  // 선택 되어있는 now & hover
  .react-calendar__tile--active:hover {
    background-color: var(--primary900);
    color: white;
  }

  // 오늘 tile hover
  .react-calendar__tile--now:hover {
    background-color: var(--gray400);
  }
`;

// DateDisplay.tsx --------------------------------------//
export const DateDisplayLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 2px 13px;
  gap: 10px;
  border: 1px solid var(--gray400);
  border-radius: 10px;

  p {
    font-size: 16px;
    line-height: 20;
    color: var(--gray800);
  }
`;

export const VerticalLine = styled.div`
  height: 27px;
  width: 1px;
  background-color: var(--gray400);
`;

export const CalendarIcon = styled(FaRegCalendar)`
  color: var(--gray800);
  width: 15px;
  height: 15px;
`;
