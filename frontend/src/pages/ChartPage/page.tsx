import * as S from './ChartPage.style';
import OverviewCard from '../../components/Chart/OverviewCard';
import OverviewLargeCard from '../../components/Chart/OverviewLargeCard';

const ChartPage = () => {
  return (
    <S.ChartPageLayout>
      <S.OverviewP>Overview</S.OverviewP>
      <S.OverviewDiv>
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
        <OverviewLargeCard />
      </S.OverviewDiv>
    </S.ChartPageLayout>
  );
};

export default ChartPage;
