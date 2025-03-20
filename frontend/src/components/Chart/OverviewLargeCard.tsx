import * as S from './Chart.style';
import policer from '../../assets/images/policer.svg';

const OverviewLargeCard = () => {
  return (
    <S.OverviewLargeCardLayout>
      <S.PoliceImg src={policer} />
      <S.InfoDiv>
        <S.TitleP>순찰 강화 필요 구역</S.TitleP>
        <S.StreetDiv>
          <S.StreetP className='big'>정릉 3동</S.StreetP>
          <S.StreetP className='small'>이번 달 기준</S.StreetP>
        </S.StreetDiv>
      </S.InfoDiv>
    </S.OverviewLargeCardLayout>
  );
};

export default OverviewLargeCard;
