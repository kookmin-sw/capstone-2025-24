import styled, { keyframes } from 'styled-components';

// OverviewDiv.tsx ------------------------------------//
export const OverviewDiv = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;


// OverviewCard.tsx -----------------------------------//
export const OverviewCardLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 215px;
  height: 98px;
  padding-left: 18px;
  justify-content: start;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(181, 181, 181, 0.25);
`;

export const VerticalLine = styled.div<{ barColor: string }>`
  background-color: ${({barColor})=>barColor};
  border-radius: 10px;
  width: 3px;
  height: 58px;
`;

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 18px;
`;

export const TitleP = styled.p`
  font-size: 13px;
  color: var(--gray600);
  font-weight: 700;
  min-width: 110px;
`;

export const CountP = styled.p<{barColor:string}>`
  font-size: ${({barColor})=>barColor==="#A8B3E3"? `25px`:`30px`};
  color: black;
  font-weight: 700;
`;

export const ToolTipDiv = styled.div`
  padding-left: 25px;
  padding-top: 55px;
`;

// OverviewLargeCard.tsx -----------------------------------//
const blinkShadow = keyframes`
  0%, 100% {
    box-shadow: 1px 1px 5px rgba(53, 73, 255, 0.54);
  }
  50% {
    box-shadow: 1px 1px 10px 3px var(--primary600);
  }
  `;

export const OverviewLargeCardLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 320px;
  height: 98px;
  padding-left: 18px;
  justify-content: start;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  /* box-shadow: 2px 2px 4px rgba(181, 181, 181, 0.25); */
  animation: ${blinkShadow} 1.5s ease-in-out infinite;
`;

export const PoliceImg = styled.img`
  margin-top: 12px;
`;

export const StreetDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 2px;
`;
export const StreetP = styled.p`
  &.big {
    font-size: 28px;
    font-weight: 700;
    color: #0c2cbb;
  }

  &.small {
    font-size: 10px;
    font-weight: 400;
    color: var(--gray600);
    margin-bottom: 4px;
  }
`;
