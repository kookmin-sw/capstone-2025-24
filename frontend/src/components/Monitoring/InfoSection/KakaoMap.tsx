import * as S from './style';
import { MapMarker } from 'react-kakao-maps-sdk';
import cctvIcon from '@/assets/cctvIcon.svg';

interface KakaoMapProps {
  setSelectedIndex: (index: number | null) => void;
}

const KakaoMap = ({ setSelectedIndex }: KakaoMapProps) => {
  const markerPositions = [
    { lat: 37.5665, lng: 126.978 }, // 서울특별시청
    { lat: 37.5512, lng: 126.9882 }, // 남산타워
    { lat: 37.5796, lng: 126.977 }, // 경복궁
    { lat: 37.5112, lng: 127.098 }, // 잠실 롯데타워
    { lat: 37.4824, lng: 126.9013 }, // 여의도공원
  ];
  return (
    <S.Maps id="map" center={{ lat: 37.5665, lng: 126.978 }} level={9}>
      {markerPositions.map((position, index) => (
        <MapMarker
          key={index}
          position={position}
          image={{
            src: cctvIcon,
            size: {
              width: 22,
              height: 22,
            },
          }}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
    </S.Maps>
  );
};

export default KakaoMap;
