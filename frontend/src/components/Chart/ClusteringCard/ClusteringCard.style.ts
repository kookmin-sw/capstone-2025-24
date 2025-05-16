import { Map } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

export const ClusteringCardLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 634px;
  height: 340px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(117, 117, 117, 0.25);
  padding: 16px;
  margin-top: 33px;
`;

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 40%;
`;

export const PanelDiv = styled.div`
  padding-left: 10px;
`;

export const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
`;
export const TitleP = styled.p`
  font-weight: 700;
  font-size: 17px;
`;

export const TooltipDiv = styled.div`
  display: flex;
  margin-top: 5px;
  text-align: center;
`;

// Map.tsx --------------------------------- //
export const Maps = styled(Map)`
  width: 60%;
  height: 280px;
  gap: 19px;
`;
