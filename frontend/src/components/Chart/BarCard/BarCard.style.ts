import styled from 'styled-components';

export const BarCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 629px;
  height: 340px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(117, 117, 117, 0.25);
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

export const FilterDiv = styled.div``;


// BarChart.tsx --------------------------------//
export const BarChartLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 270px;
`;

export const ChartScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface ChartCanvasWrapperProps {
  $customWidth: string;
}

export const ChartCanvasWrapper = styled.div<ChartCanvasWrapperProps>`
  width: ${(props) => props.$customWidth};
  min-width: 100%;
  height: 100%;
`;

export const CustomLegend = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 10;
  background-color: white; // optional
  position: relative;
`;

export const LegendItem = styled.div<{$isHidden:boolean}>`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 13px;
  opacity: ${({$isHidden})=>$isHidden?"0.5":"1"};
`;

export const ColorBox = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;


export const FixedLegendContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  background: white;
`;

interface ColorBoxProps {
  $bgcolor: string;
  $isHidden: boolean;
}

export const LegendColorBox = styled.div<ColorBoxProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({$isHidden, $bgcolor})=>$isHidden?`var(--gray600)`:$bgcolor};
`;