import * as S from './IncidentDetailsModal.style.ts';
import { MapMarker } from 'react-kakao-maps-sdk';
import pinIcon from '@/assets/icons/pinIcon.svg';

const Map = () => {
  return (
    <S.MapDiv id="map" center={{ lat: 37.5665, lng: 126.978 }} level={4} draggable={false}>
      <MapMarker
        position={{ lat: 37.5665, lng: 126.978 }}
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
