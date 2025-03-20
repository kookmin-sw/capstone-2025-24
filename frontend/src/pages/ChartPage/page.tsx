import * as S from './ChartPage.style';
import OverviewCard from '../../components/Chart/OverviewCard';
import OverviewLargeCard from '../../components/Chart/OverviewLargeCard';
import { OVERVIEW_LIST } from '../../constants/overviewList';
import {OVERVIEWCOUNT} from "../../mocks/OverviewCount";

const ChartPage = () => {
  return (
    <S.ChartPageLayout>
      <S.OverviewP>Overview</S.OverviewP>
      <S.OverviewDiv>
        {OVERVIEW_LIST.map((it,idx) => {
          return <OverviewCard key={it.title} title={it.title} tooltipText={it.tooltipText} count={OVERVIEWCOUNT[idx]} />;
        })}
        <OverviewLargeCard />
      </S.OverviewDiv>
    </S.ChartPageLayout>
  );
};

export default ChartPage;
