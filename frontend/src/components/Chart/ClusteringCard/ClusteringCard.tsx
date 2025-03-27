import * as S from './ClusteringCard.style';
import ClusterMap from './ClusterMap';
import StatsPanel from './StatsPanel/StatsPanel';
import ToolTip from '../../common/ToolTip/ToolTip';
const ClusteringCard = () => {
  return (
    <S.ClusteringCardLayout>
      <ClusterMap />
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
