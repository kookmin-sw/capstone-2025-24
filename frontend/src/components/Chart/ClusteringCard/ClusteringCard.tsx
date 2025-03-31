import * as S from './ClusteringCard.style';
import ClusterMap from './ClusterMap';
import StatsPanel from './StatsPanel/StatsPanel';
import ToolTip from '../../common/ToolTip/ToolTip';
import { useScrollObserver } from '../../../hooks/useScrollObserver';
import { useRef, useState, useEffect } from 'react';
import { getClusterData } from '@/apis/ChartApi';
import { positionItem, statsItem } from '@/types/chartType';
const ClusteringCard = () => {
  const [clusterData, setClusterData] = useState<positionItem[] | undefined>();
  const [statsData, setStatsData] = useState<statsItem | undefined>();
  const [inviewPort, setInviewPort] = useState<boolean>(false);
  const element = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const fetchClusterData = async () => {
  //     const data = await getClusterData();
  //     setClusterData(data);

  //     const initialStats: statsItem = {
  //       fire_count: 0,
  //       assault_count: 0,
  //       crowd_congestion_count: 0,
  //       weapon_count: 0,
  //       swoon_count: 0,
  //     };

  //     const computedStats: statsItem = (clusterData ?? []).reduce(
  //       (acc, item) => ({
  //         fire_count: acc.fire_count + item.fire_count,
  //         assault_count: acc.assault_count + item.assault_count,
  //         crowd_congestion_count: acc.crowd_congestion_count + item.crowd_congestion_count,
  //         weapon_count: acc.weapon_count + item.weapon_count,
  //         swoon_count: acc.swoon_count + item.swoon_count,
  //       }),
  //       initialStats,
  //     );
  //     setStatsData(computedStats);
  //   };

  //   fetchClusterData();
  // }, []);

  useEffect(() => {
    useScrollObserver({ setInviewPort, element });
  });

  return (
    <S.ClusteringCardLayout ref={element}>
      <ClusterMap clusterData={clusterData} />
      {inviewPort && <StatsPanel isVisible={inviewPort} statsData={statsData} />}
      <S.TooltipDiv>
        <ToolTip>
          <p>올해 기준</p>
        </ToolTip>
      </S.TooltipDiv>
    </S.ClusteringCardLayout>
  );
};

export default ClusteringCard;
