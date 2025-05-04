import * as S from './LoginCard.style.ts';
import logoWhite from '@/assets/icons/logoWhite.svg';
import InfoSlider from '../InfoSlider/InfoSlider.tsx';

const InfoSide = () => {
  return (
    <S.InfoSide>
      <S.LogoImg src={logoWhite} alt="logowhite" width={124} />
      <InfoSlider />
    </S.InfoSide>
  );
};

export default InfoSide;
