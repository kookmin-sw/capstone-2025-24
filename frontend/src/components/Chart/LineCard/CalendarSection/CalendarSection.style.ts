import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { FaRegCalendar } from 'react-icons/fa6';

// CalendarSection.tsx -------------------------------//
export const CalendarSectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 255px;
  height: 100%;
`;

// CalenderComponent.tsx -----------------------------------//
export const CalenderComponentLayout = styled.div`
  width: 252px;
  height: 260px;
  overflow: hidden;

  // 최상단 div
  .react-calendar {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--gray400);
    padding: 10px 7px;
    background-color: white;
  }

  // 네비게이션 배치 설정
  .react-calendar__navigation {
    height: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 0;

    button:hover {
      background: none !important;
      box-shadow: none !important;
    }
  }

  .react-calendar__navigation button {
    min-height: 20px;
    font-weight: 700;
    font-size: 11.5px;
    background: transparent;
    box-shadow: none;
    outline: none;
    border: none;
    cursor: pointer;
  }

  .react-calendar__navigation button:hover,
  .react-calendar__navigation button:focus,
  .react-calendar__navigation button:focus-visible,
  .react-calendar__navigation button:active {
    background: transparent !important;
    box-shadow: none !important;
    outline: none !important;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 500;
    font-size: 8px;
    color: var(--gray500);
  }

  .react-calendar__navigation__label {
    flex-grow: 0 !important;
    margin: 0 24px;
  }

  .react-calendar__navigation__arrow {
    color: var(--gray500);
  }
  .react-calendar__navigation__arrow:hover {
    color: var(--gray800);
    background-color: white;
  }

  .react-calendar__tile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 32px;
    box-sizing: border-box;
    min-width: unset;
    min-height: unset;
    padding: 0;
    margin: 0;
    border-radius: 50%;
    background-color: white;
    font-size: 12px;
    font-weight: 600;
    color: var(--gray800);
  }

  .react-calendar__tile:disabled {
    pointer-events: none;
    color: var(--gray400) !important;
  }

  .react-calendar__tile:disabled:hover,
  .react-calendar__tile:disabled:focus {
    background: inherit !important;
    color: var(--gray400) !important;
  }

  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: var(--primary800);
    color: white;
  }

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
    background-color: var(--primary800);
    color: white;
  }

  // 오늘 tile hover
  .react-calendar__tile--now:hover {
    background-color: var(--gray400);
  }

  // 오늘 tile hover
  .react-calendar__tile--now.react-calendar__tile--active:hover {
    background-color: var(--primary800);
    color: white;
  }
`;

// DateDisplay.tsx --------------------------------------//
export const DateDisplayLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 252px;
  height: 40px;
  padding: 2px 13px;
  gap: 15px;
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
  width: 17px;
  height: 17px;
  padding-top: 2px;
`;

export const DisplaySpan = styled.span`
  color: var(--gray800);
  font-size: 16px;
  font-weight: 500;
`;
