import * as S from './Login.style.ts';
import LOGOWHITE from '@/assets/icons/logo_white.svg';
import VisualSlider from './VisualSlider/VisualSlider.tsx';

const VisualSide = () => {
  return (
    <S.VisualSide>
      <img src={LOGOWHITE} alt="logowhite" width={124} />
      <VisualSlider/>
    </S.VisualSide>
  );
};

export default VisualSide;
