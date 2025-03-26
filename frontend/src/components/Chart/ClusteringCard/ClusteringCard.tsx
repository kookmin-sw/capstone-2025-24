import * as S from './ClusteringCard.style';
import Map from './Map';
import StatsPanel from './StatsPanel/StatsPanel';
import ToolTip from '../../common/ToolTip/ToolTip';
const ClusteringCard = () => {
  return (
    <S.ClusteringCardLayout>
      <Map />
      <StatsPanel />
      <S.TooltipDiv>
        <ToolTip>
          <p>올해 기준</p>
        </ToolTip>
      </S.TooltipDiv>
    </S.ClusteringCardLayout>
  );
};

export default ClusteringCard;
