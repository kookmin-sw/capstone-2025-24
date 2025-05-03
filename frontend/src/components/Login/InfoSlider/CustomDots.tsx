import { ReactNode } from 'react';
import * as S from './InfoSlider.style';

const CustomDots = (dots: ReactNode): ReactNode => {
  return (
    <S.CustomDotsLayout>
      <ul> {dots} </ul>
    </S.CustomDotsLayout>
  );
};

export default CustomDots;
