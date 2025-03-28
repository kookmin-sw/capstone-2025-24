import * as S from './ClusteringCard.style';
import { MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { ClusterData } from '../../../mocks/ClusterData';
import pinIcon from '@/assets/icons/pinIcon.svg';
const ClusterMap = () => {
  return (
    <S.Maps center={{ lat: 37.5863, lng: 127.0203 }} level={8}>
      <MarkerClusterer
        averageCenter={true}
        minLevel={3}
        styles={[
          {
            width: '50px',
            height: '50px',
            background: 'rgba(138, 157,255, 0.5)',
            color: '#fff',
            border: '1px solid #8A9DFF',
            borderRadius: '50%',
            textAlign: 'center',
            lineHeight: '50px',
            fontSize: '14px',
          },
        ]}
      >
        {ClusterData.map((pos) => (
          <MapMarker
            key={`${pos.latitude}-${pos.longitude}`}
            position={{
              lat: pos.latitude,
              lng: pos.longitude,
            }}
            image={{
              src: pinIcon,
              size: {
                width: 20,
                height: 30,
              },
              options: { offset: { x: 0, y: 0 } },
            }}
          />
        ))}
      </MarkerClusterer>
    </S.Maps>
  );
};

export default ClusterMap;
