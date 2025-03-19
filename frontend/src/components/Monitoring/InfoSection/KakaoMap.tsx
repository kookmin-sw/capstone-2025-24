import * as S from './style';
import { markerPositions } from '../../../mocks/LocationData';
import { MapMarker } from 'react-kakao-maps-sdk';
import cctvIcon from '@/assets/cctvIcon.svg';
import cctvIconBlue from '@/assets/cctvBlueIcon.svg';

interface KakaoMapProps {
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
}

const KakaoMap = ({ selectedIndex, setSelectedIndex }: KakaoMapProps) => {
  return (
    <S.Maps id="map" center={{ lat: 37.5665, lng: 126.978 }} level={9}>
      {markerPositions.map((position, index) => (
        <MapMarker
          key={index}
          position={position}
          image={{
            src: selectedIndex === index ? cctvIconBlue : cctvIcon,
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
