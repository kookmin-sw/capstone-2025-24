import * as S from './InfoSection.style';
import { MapMarker } from 'react-kakao-maps-sdk';
import cctvIcon from '@/assets/icons/cctvIcon.svg';
import cctvIconBlue from '@/assets/icons/cctvBlueIcon.svg';
import { CctvInfo } from '@/types/cctv';

interface KakaoMapProps {
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
  Locations: CctvInfo[];
}

const KakaoMap = ({ selectedIndex, setSelectedIndex, Locations }: KakaoMapProps) => {
  return (
    <S.Maps id="map" center={{ lat: 37.611, lng: 126.9949 }} level={4} >
      {Locations.map((location, index) => (
        <MapMarker
          key={index}
          position={{
            lat: location.latitude,
            lng: location.longitude,
          }}
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
