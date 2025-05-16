import * as S from './Overview.style';
import policer from '../../../assets/images/policer.svg';
import ToolTip from '@/components/common/ToolTip/ToolTip';
import { addressFormatter } from '@/utils/addressFormatter';
const OverviewLargeCard = ({ title }: { title: string | undefined }) => {
  return (
    <S.OverviewLargeCardLayout>
      <S.PoliceImg src={policer} />
      <S.InfoDiv>
        <S.TitleP>순찰 강화 필요 구역</S.TitleP>
        <S.StreetDiv>
          <S.StreetP className="big">{addressFormatter(title)}</S.StreetP>
        </S.StreetDiv>
      </S.InfoDiv>
      <S.TooltipDiv>
        <ToolTip>
          <span>이번 달 기준</span>
        </ToolTip>
      </S.TooltipDiv>
    </S.OverviewLargeCardLayout>
  );
};

export default OverviewLargeCard;
