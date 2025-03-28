import * as S from './Overview.style';
import ToolTip from '../../common/ToolTip/ToolTip';
import useCountUp from '../../../hooks/useCountUp';

interface OverviewCardType {
  title: string;
  count: string;
  tooltipText: string;
  $barColor: string;
}
const OverviewCard = ({ title, count, tooltipText, $barColor }: OverviewCardType) => {
  return (
    <S.OverviewCardLayout>
      <S.VerticalLine $barColor={$barColor} />
      <S.InfoDiv>
        <S.TitleP>{title}</S.TitleP>
        <S.CountP $barColor={$barColor}>{isNaN(parseInt(count)) ? count : useCountUp(parseInt(count))}</S.CountP>
      </S.InfoDiv>
      <S.ToolTipDiv>
        <ToolTip>
          <span>{tooltipText}</span>
        </ToolTip>
      </S.ToolTipDiv>
    </S.OverviewCardLayout>
  );
};

export default OverviewCard;
