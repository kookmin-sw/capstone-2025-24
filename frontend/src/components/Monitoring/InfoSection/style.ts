import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';

//------------------
// InfoSection.tsx
//------------------

export const InfoLayout = styled.div`
  display: flex;
  gap: 5px;
`;

//--------------
// KakaoMap.tsx
//--------------

export const Maps = styled(Map)`
  width: 413px;
  height: 246px;
  border-radius: 8px;
`;

//--------------
// InfoBox.tsx
//-------------

export const InfoBoxLayout = styled.div`
  /* padding: 51px 57px; */
`;
export const InfoDiv = styled.div`
  border: solid 1px black;
  width: 413px;
  height: 246px;
`;
