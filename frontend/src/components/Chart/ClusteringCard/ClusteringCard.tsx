import * as S from './ClusteringCard.style';
import Map from './Map';
import StatsPanel from './StatsPanel/StatsPanel';
const ClusteringCard = () => {
  return (
    <S.ClusteringCardLayout>
      <Map />
      <StatsPanel />
    </S.ClusteringCardLayout>
  );
};

export default ClusteringCard;
