import styled from 'styled-components';

export const BarCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 629px;
  height: 340px;
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

export const FilterDiv = styled.div`

`;
// BarChart.tsx --------------------------------//
export const BarChartLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 280px;
  padding: 0px 40px;
`;