import * as S from './ClusteringCard.style';
import ClusterMap from './ClusterMap';
import StatsPanel from './StatsPanel/StatsPanel';
import ToolTip from '../../common/ToolTip/ToolTip';
import { useScrollObserver } from '../../../hooks/useScrollObserver';
import { useRef, useState, useEffect } from 'react';

const ClusteringCard = () => {
  const [inviewPort, setInviewPort] = useState<boolean>(false);
  const element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    useScrollObserver({ setInviewPort, element });
  });

  return (
    <S.ClusteringCardLayout>
      <ClusterMap />
      {inviewPort && <StatsPanel isVisible={inviewPort}/>}
      <S.TooltipDiv>
        <ToolTip>
          <p>올해 기준</p>
        </ToolTip>
      </S.TooltipDiv>
    </S.ClusteringCardLayout>
  );
};

export default ClusteringCard;
