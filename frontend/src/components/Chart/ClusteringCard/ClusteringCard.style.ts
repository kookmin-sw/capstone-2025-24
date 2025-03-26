import { Map } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

export const ClusteringCardLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 634px;
  height: 340px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(117, 117, 117, 0.25);
  padding: 16px;
  margin-top: 33px;
  gap: 19px;
`;

// Map.tsx --------------------------------- //
export const Maps = styled(Map)`
  width: 351px;
  height: 271px;
`;
