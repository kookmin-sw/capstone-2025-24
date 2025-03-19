import * as S from './Chart.style';
import ToolTip from '../common/ToolTip/ToolTip';
const OverviewCard = () => {
  return (
    <S.OverviewCardLayout>
      <S.VerticalLine />
      <S.InfoDiv>
        <S.TitleP>최근 발생 사건 수</S.TitleP>
        <S.CountP>17</S.CountP>
      </S.InfoDiv>
      <S.ToolTipDiv>
        <ToolTip>
          <span>지난 7일 기준</span>
        </ToolTip>
      </S.ToolTipDiv>
    </S.OverviewCardLayout>
  );
};

export default OverviewCard;
