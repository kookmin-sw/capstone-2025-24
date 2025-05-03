import * as S from './LoginCard.style.ts';
import LOGOWHITE from '@/assets/icons/logo_white.svg';
import InfoSlider from '../InfoSlider/InfoSlider.tsx';

const InfoSide = () => {
  return (
    <S.InfoSide>
      <img src={LOGOWHITE} alt="logowhite" width={124} />
      <InfoSlider />
    </S.InfoSide>
  );
};

export default InfoSide;
