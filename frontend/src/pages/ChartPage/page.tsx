import * as S from './ChartPage.style';
import OverviewCard from '../../components/Chart/OverviewCard';
import OverviewLargeCard from '../../components/Chart/OverviewLargeCard';
import { OVERVIEW_LIST } from '../../constants/overviewList';
import { OVERVIEWCOUNT } from '../../mocks/OverviewCount';
import DoughnutCard from '../../components/Chart/DoughnutCard/DoughnutCard';
import BarCard from '../../components/Chart/BarCard/BarCard';

const ChartPage = () => {
  return (
    <S.ChartPageLayout>
      <S.OverviewP>Overview</S.OverviewP>
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
      <S.ChartSecondDiv>
        <BarCard />
        <DoughnutCard title="유형별 사건 수" />
      </S.ChartSecondDiv>
    </S.ChartPageLayout>
  );
};

export default ChartPage;
