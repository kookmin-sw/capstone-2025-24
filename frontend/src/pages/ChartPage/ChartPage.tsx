import * as S from './ChartPage.style';
import DoughnutCard from '../../components/Chart/DoughnutCard/DoughnutCard';
import BarCard from '../../components/Chart/BarCard/BarCard';
import OverviewDiv from '../../components/Chart/Overview/OverviewDiv';
import LineCard from '../../components/Chart/LineCard/LineCard';
import ClusteringCard from '../../components/Chart/ClusteringCard/ClusteringCard';
const ChartPage = () => {
  return (
    <S.ChartPageLayout>
      <S.ComponentWrapper>
        <S.OverviewP>Overview</S.OverviewP>
        <OverviewDiv />
        <S.ChartFirstDiv>
          {/* <LineCard /> */}
        </S.ChartFirstDiv>
        <S.ChartSecondDiv>
          <BarCard />
          <DoughnutCard title="유형별 사건 수" type="category" />
        </S.ChartSecondDiv>
        <S.ChartThirdDiv>
          <DoughnutCard title="장소별 사건 수" type="region" />
          {/* <ClusteringCard /> */}
        </S.ChartThirdDiv>
      </S.ComponentWrapper>
    </S.ChartPageLayout>
  );
};

export default ChartPage;
