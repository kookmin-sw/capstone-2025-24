import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';
import { MdMyLocation } from 'react-icons/md';

interface LocationProps {
  selected: boolean;
}

// InfoSection.tsx ------------------------------------------------//

export const InfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: auto;
  justify-content: center;
`;

export const InfoContent = styled.div`
  display: flex;
  gap: 5px;
`;

// KakaoMap.tsx ------------------------------------------------//

export const Maps = styled(Map)`
  width: 413px;
  height: 246px;
  border-radius: 8px;
  border: solid 1px var(--gray400);
`;

// InfoBox.tsx ------------------------------------------------//

export const InfoBoxLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid 0.5px var(--gray400);
  width: 413px;
  height: 246px;
  padding: 0 10px;
  background: #fff;
  border-radius: 8px;
`;

export const UpperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
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
  gap: 5px;
  padding: 0 7px;
  max-height: 157px;
  overflow-y: auto;
  cursor: pointer;

  img {
    width: 22px;
    height: 22px;
    margin-right: 12px;
  }
`;

export const Location = styled.div<LocationProps>`
  display: flex;
  align-items: center;
  border-radius: 7px;
  padding: 4px 10px;
  background-color: ${({ selected }) => (selected ? 'var(--primary400)' : 'transparent')};
  color: ${({ selected }) => (selected ? 'var(--primary900)' : 'var(--gray600)')};
`;

export const VideoPlayer = styled.video`
  margin-top: 15px;
  width: 831px;
  height: 467px;
  border: none;
  border-radius: 8px;
`;
