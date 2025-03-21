import * as S from '../Chart.style';
import OverviewCard from '../../../components/Chart/Overview/OverviewCard';
import OverviewLargeCard from '../../../components/Chart/Overview/OverviewLargeCard';
import { OVERVIEW_LIST } from '../../../constants/overviewList';
import { OVERVIEWCOUNT } from '../../../mocks/OverviewCount';

const OverviewDiv = () => {
  return (
    <S.OverviewDiv>
      {OVERVIEW_LIST.map((it, idx) => {
        return (
          <OverviewCard
            key={it.title}
            title={it.title}
            tooltipText={it.tooltipText}
            count={OVERVIEWCOUNT[idx]}
            barColor={it.barColor}
          />
        );
      })}
      <OverviewLargeCard />
    </S.OverviewDiv>
  );
};

export default OverviewDiv;