import * as S from './ChartPage.style';
import OverviewCard from '../../components/Chart/OverviewCard';
const ChartPage = () => {
  return (
    <S.ChartPageLayout>
      <S.OverviewP>Overview</S.OverviewP>
      <S.OverviewDiv>
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
      </S.OverviewDiv>
    </S.ChartPageLayout>
  );
};

export default ChartPage;
