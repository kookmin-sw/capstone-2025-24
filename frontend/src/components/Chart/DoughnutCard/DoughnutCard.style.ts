import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';

export const DoughnutCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 466px;
  height: 340px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  padding: 16px;
  margin-top: 33px;
`;
export const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TitleP = styled.p`
  font-weight: 700;
  font-size: 17px;
`;

// DoughnutChart.tsx --------------------------------//
export const DoughnutChartLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  gap: 10px;
`;

export const GraphDiv = styled.div`
  height: 100%;
  width: 219px;
  height: 219px;
`;

export const DoughnutChart = styled(Doughnut)`
  margin: 3px;
  padding: 10px;
`;

// LabelBox.tsx --------------------//
export const LabelBoxLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 110px;
  height: 112px;
  justify-content: space-between;
`;

// Label.tsx ----------------------//
export const LabelItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 5px;
`;

export const ColorChip = styled.div<{ color?: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

export const LabelP = styled.p`
  &.category {
    color: var(--gray800);
    font-size: 12px;
    font-weight: 600;
    margin-left: 5px;
  }

  &.count {
    color: var(--gray500);
    font-size: 12px;
    font-weight: 600;
    margin-left: auto;
  }
`;
