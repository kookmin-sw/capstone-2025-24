import * as S from './InfoSection.style';
import { MapMarker } from 'react-kakao-maps-sdk';
import cctvIcon from '@/assets/icons/cctvIcon.svg';
import cctvIconBlue from '@/assets/icons/cctvBlueIcon.svg';
import { CctvInfo } from '@/types/cctv';
import { useSelectedCctvStore } from '@/stores/selectedCctvStore';

interface KakaoMapProps {
  Locations: CctvInfo[];
}

const KakaoMap = ({ Locations }: KakaoMapProps) => {
  const { selectedIndex, setSelectedIndex } = useSelectedCctvStore();
  return (
    <S.Maps id="map" center={{ lat: 37.6105, lng: 126.9978 }} level={4} zoomable={false}>
      {Locations.map((location, index) => (
        <MapMarker
          key={index}
          position={{
            lat: location.latitude,
            lng: location.longitude,
          }}
          image={{
            src: selectedIndex === location.id ? cctvIconBlue : cctvIcon,
            size: {
              width: 22,
              height: 22,
            },
          }}
          onClick={() => setSelectedIndex(location.id)}
        />
      ))}
    </S.Maps>
  );
};

export default KakaoMap;
