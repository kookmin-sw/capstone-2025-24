import * as S from './VisualSlider.style';

const CustomDots = (dots: any) => {
  return (
    <S.CustomDotsLayout>
      <ul> {dots} </ul>
    </S.CustomDotsLayout>
  );
};

export default CustomDots;