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
  height: 87%;
  gap: 15px;
  align-items: center;
`;

// LineChart.tsx ------------------------------------- //
export const LineChartLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid red;
`;

export const LineChart = styled(Line)`
  width: 100%;
  height: 100%;
`;
