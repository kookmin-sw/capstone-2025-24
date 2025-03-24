import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// CalendarSection.tsx -------------------------------//
export const CalendarSectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 255px;
  height: 290px;
  border: 1px solid red;
`;

// CalenderComponent.tsx -----------------------------------//
export const CalenderComponentLayout = styled.div`
  width: 252px;
  height: 240px;

  /* 캘린더 전체 설정 */
  .react-calender {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    border: 1.3px solid var(--gray400);
  }
  .react-calendar__month-view__days {
  }

  // 네비게이션 배치 설정
  .react-calendar__navigation {
    display: flex;
    justify-content: center;
  }
  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 700;
    font-size: 11.5px;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:hover {
    background-color: white;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
    color: var(--gray400);
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }
  .react-calendar__tile {
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
    border-radius: 50%;
    background-color: var(--gray400);
  }

  
`;
