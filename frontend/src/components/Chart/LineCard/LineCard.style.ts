import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

export const LineCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 1118px;
  height: 405px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  padding: 16px;
  margin-top: 33px;
  gap: 15px;
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

export const ContentDiv = styled.div`
  display: flex;
  width: 100%;
  height: 337px;
  gap: 15px;
  align-items: center;
  justify-content: center;
`;

// LineChart.tsx ------------------------------------- //
export const LineChartLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const LineChart = styled(Line)`
  width: 100%;
  min-height: 200px;
`;

export const FixedLegendContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  background: white;
  width: 100%;
  margin-bottom: 12px;
`;

export const LegendItem = styled.div<{$isHidden:boolean}>`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 12px;
  opacity: ${({$isHidden})=>$isHidden?"0.5":"1"};
`;

interface ColorBoxProps {
  $bgcolor: string;
  $isHidden: boolean;
}

export const LegendColorBox = styled.div<ColorBoxProps>`
  width: 10px;
  height: 3px;
  background-color: ${({$isHidden, $bgcolor})=>$isHidden?`var(--gray600)`:$bgcolor};
`;