import * as S from './InfoSection.style';
import { MapMarker } from 'react-kakao-maps-sdk';
import cctvIcon from '@/assets/icons/cctvIcon.svg';
import cctvIconBlue from '@/assets/icons/cctvBlueIcon.svg';

interface KakaoMapProps {
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
  Locations: {
    position: {
      lat: number;
      lng: number;
    };
  }[];
}

const KakaoMap = ({ selectedIndex, setSelectedIndex, Locations }: KakaoMapProps) => {
  return (
    <S.Maps id="map" center={{ lat: 37.5665, lng: 126.978 }} level={9} zoomable={false}>
      {Locations.map((location, index) => (
        <MapMarker
          key={index}
          position={location.position}
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
