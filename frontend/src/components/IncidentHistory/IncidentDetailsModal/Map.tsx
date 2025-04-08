import * as S from './IncidentDetailsModal.style.ts';
import { MapMarker } from 'react-kakao-maps-sdk';
import pinIcon from '@/assets/icons/pinIcon.svg';

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map = ({latitude, longitude} : MapProps) => {
  return (
    <S.MapDiv id="map" center={{ lat: latitude, lng: longitude }} level={4}>
      <MapMarker
        position={{ lat: latitude, lng: longitude }}
        image={{
          src: pinIcon,
          size: {
            width: 20,
            height: 30,
          },
        }}
      />
    </S.MapDiv>
  );
};

export default Map;
