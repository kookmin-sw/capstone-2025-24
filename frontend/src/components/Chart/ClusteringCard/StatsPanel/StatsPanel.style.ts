import styled from 'styled-components';

// StatsPanel.tsx ------------------------------ //
export const StatsPanelLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 271px;
  width: 178px;
  gap: 12px;

  p {
    font-size: 14px;
    font-weight: bold;
  }
`;

// StatsItem.tsx ------------------------------ //
export const StatsItemLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const LabelDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const RatioBar = styled.div`
  width: 100%;
  height: 4px;
`;

export const BarBase = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background-color: #eeeeee;
  position: relative;
  overflow: hidden;
`;

interface BarFillProps {
  $count: number;
  $fillcolor: string;
}

export const BarFill = styled.div<BarFillProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ $count }) => $count}%;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ $fillcolor }) => $fillcolor};
  transition: width 1.5s ease;
`;
