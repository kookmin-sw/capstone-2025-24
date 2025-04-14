import * as S from './ClusteringCard.style';
import { MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import pinIcon from '@/assets/icons/pinIcon.svg';
import { positionItem } from '@/types/chart';
interface ClusterMapProps {
  clusterData: positionItem[] | undefined;
}
const ClusterMap = ({ clusterData }: ClusterMapProps) => {
  return (
    <S.Maps center={{ lat: 37.611035490773, lng: 126.99457310622 }} level={4}>
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
        {clusterData?.map((pos) => (
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
