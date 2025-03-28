import styled from 'styled-components';

export const ChartPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  height: 100vh;
  padding: 15px 50px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ComponentWrapper = styled.div`
`;

export const OverviewP = styled.p`
  font-size: 25px;
  font-weight: 600;
`;

export const ChartFirstDiv = styled.div``;

export const ChartSecondDiv = styled.div`
  display: flex;
  gap: 22px;
`;

export const ChartThirdDiv = styled.div`
  display: flex;
  gap: 22px;
  padding-bottom: 30px;
`;
