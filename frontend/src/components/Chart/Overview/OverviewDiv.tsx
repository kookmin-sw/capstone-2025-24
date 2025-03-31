import * as S from './Overview.style';
import OverviewCard from '../../../components/Chart/Overview/OverviewCard';
import OverviewLargeCard from '../../../components/Chart/Overview/OverviewLargeCard';
import { OVERVIEW_LIST } from '../../../constants/overviewList';
import { getOverview } from '@/apis/ChartApi';
import { useEffect, useState } from 'react';
import { overviewType } from '@/types/chartType';
import { EVENT_CATEGORY } from '@/constants/EventCategory';
const OverviewDiv = () => {
  const [overviewData, setOverviewData] = useState<overviewType | undefined>(undefined);
  useEffect(() => {
    const fetchOverviewData = async () => {
      const data = await getOverview();
      setOverviewData(data);
    };

    fetchOverviewData();
  }, []);
  return (
    <S.OverviewDiv>
      {OVERVIEW_LIST.map((it) => {
        const count = overviewData ? overviewData[it.type as keyof typeof overviewData] : 0;

        let displayCount = count;
        if (it.type === 'mostCase' && typeof overviewData?.mostCase === 'string') {
          displayCount = EVENT_CATEGORY[overviewData?.mostCase] || overviewData?.mostCase;
        }
        return (
          <OverviewCard
            key={it.title}
            title={it.title}
            tooltipText={it.tooltipText}
            count={displayCount.toString()}
            $barColor={it.$barColor}
          />
        );
      })}
      <OverviewLargeCard title={overviewData?.patrolRegion} />
    </S.OverviewDiv>
  );
};

export default OverviewDiv;
