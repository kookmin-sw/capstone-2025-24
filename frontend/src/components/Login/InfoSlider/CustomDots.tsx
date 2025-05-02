import * as S from './InfoSlider.style';

const CustomDots = (dots: any) => {
  return (
    <S.CustomDotsLayout>
      <ul> {dots} </ul>
    </S.CustomDotsLayout>
  );
};

export default CustomDots;