import * as S from './ChartPage.style';
import DoughnutCard from '../../components/Chart/DoughnutCard/DoughnutCard';
import BarCard from '../../components/Chart/BarCard/BarCard';
import OverviewDiv from '../../components/Chart/Overview/OverviewDiv';
import LineCard from '../../components/Chart/LineCard/LineCard';
import ClusteringCard from '../../components/Chart/ClusteringCard/ClusteringCard';
import { LABELBYCATEGORY, LABELBYREGION } from '../../constants/labelList';
const ChartPage = () => {
  return (
    <S.ChartPageLayout>
      <S.ComponentWrapper>
        <S.OverviewP>Overview</S.OverviewP>
        <OverviewDiv />
        <S.ChartFirstDiv>
          <LineCard />
        </S.ChartFirstDiv>
        <S.ChartSecondDiv>
          <BarCard />
          <DoughnutCard title="유형별 사건 수" legendItems={LABELBYCATEGORY} type="category"/>
        </S.ChartSecondDiv>
        <S.ChartThirdDiv>
          <DoughnutCard title="위치별 사건 수" legendItems={LABELBYREGION} type="region"/>
          <ClusteringCard />
        </S.ChartThirdDiv>
      </S.ComponentWrapper>
    </S.ChartPageLayout>
  );
};

export default ChartPage;
