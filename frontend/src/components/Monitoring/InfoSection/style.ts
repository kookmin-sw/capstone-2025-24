import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';
import { MdMyLocation } from 'react-icons/md';

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
  border: solid 0.5px var(--gray400);
  width: 413px;
  height: 246px;
  padding: 22px 17px;
  background: #fff;
  border-radius: 8px;   
`;

export const UpperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 7px;
`;

export const Title = styled.p`
  font-size: 22px;
  font-weight: bold;
`;

export const SeoulP = styled.p`
  font-size: 10px;
  color: var(--gray800);
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`;

export const Line = styled.hr`
  height: 1px;
  background: var(--gray400);
  border: none;
  margin: 13px 0;
`;

export const LocationIcon = styled(MdMyLocation)`
  width: 13px;
  height: 13px;
  color: var(--primary900);
`;

export const LocationDiv = styled.div`
  font-size: 16px;
  color: var(--gray600);
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 7px;
  max-height: 157px;
  overflow-y: auto;

  img {
    width: 22px;
    height: 22px;
    margin-right: 12px;
  }
`;

export const Location = styled.p`
  display: flex;
  align-items: center;
`;
