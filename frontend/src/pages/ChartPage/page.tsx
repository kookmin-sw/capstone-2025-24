import * as S from './ChartPage.style';
import DoughnutCard from '../../components/Chart/DoughnutCard/DoughnutCard';
import BarCard from '../../components/Chart/BarCard/BarCard';
import OverviewDiv from '../../components/Chart/Overview/OverviewDiv';

const ChartPage = () => {
  return (
    <S.ChartPageLayout>
      <S.OverviewP>Overview</S.OverviewP>
      <OverviewDiv />
      <S.ChartSecondDiv>
        <BarCard />
        <DoughnutCard title="유형별 사건 수" />
      </S.ChartSecondDiv>
    </S.ChartPageLayout>
  );
};

export default ChartPage;
