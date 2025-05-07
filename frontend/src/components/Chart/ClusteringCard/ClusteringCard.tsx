import * as S from './ClusteringCard.style';
import ClusterMap from './ClusterMap';
import StatsPanel from './StatsPanel/StatsPanel';
import ToolTip from '../../common/ToolTip/ToolTip';
import { useScrollObserver } from '../../../hooks/useScrollObserver';
import { useRef, useState, useEffect } from 'react';
import { getClusterData } from '@/apis/ChartApi';
import { positionItem, statsItem } from '@/types/chart';
const ClusteringCard = () => {
  const [clusterData, setClusterData] = useState<positionItem[]>([]);
  const [statsData, setStatsData] = useState<statsItem | undefined>();
  const [inviewPort, setInviewPort] = useState<boolean>(false);
  const element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchClusterData = async () => {
      const data = await getClusterData();
      if (!Array.isArray(data)) {
        setClusterData([]);
        setStatsData({
          fireCount: 0,
          smokeCount: 0,
          assaultCount: 0,
          crowdCongestionCount: 0,
          weaponCount: 0,
          swoonCount: 0,
        });
        return;
      } else {
        setClusterData(data);
        const initialStats: statsItem = {
          fireCount: 0,
          smokeCount: 0,
          assaultCount: 0,
          crowdCongestionCount: 0,
          weaponCount: 0,
          swoonCount: 0,
        };

        const computedStats = (data: statsItem[]) => {
          return data.reduce(
            (acc, item) => ({
              fireCount: acc.fireCount + item.fireCount,
              smokeCount: acc.smokeCount + item.smokeCount,
              assaultCount: acc.assaultCount + item.assaultCount,
              crowdCongestionCount: acc.crowdCongestionCount + item.crowdCongestionCount,
              weaponCount: acc.weaponCount + item.weaponCount,
              swoonCount: acc.swoonCount + item.swoonCount,
            }),
            initialStats,
          );
        };
        setStatsData(computedStats(data));
      }
    };

    fetchClusterData();
  }, []);

  useEffect(() => {
    useScrollObserver({ setInviewPort, element });
  });

  return (
    <S.ClusteringCardLayout ref={element}>
      <S.ContentDiv>
        <S.TitleDiv>
          <S.TitleP>관할 구역 사건수</S.TitleP>
          <S.TooltipDiv>
            <ToolTip>
              <p>이번 달 기준</p>
            </ToolTip>
          </S.TooltipDiv>
        </S.TitleDiv>
        <S.PanelDiv>{inviewPort && <StatsPanel isVisible={inviewPort} statsData={statsData} />}</S.PanelDiv>
      </S.ContentDiv>
      <ClusterMap clusterData={clusterData} />
    </S.ClusteringCardLayout>
  );
};

export default ClusteringCard;
