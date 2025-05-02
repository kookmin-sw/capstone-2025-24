import styled from 'styled-components';
import Slider from 'react-slick';

// VisualSlider.tsx ----------------------------- //
export const VisualSliderLayout = styled.div`
  width: 440px;
  height: 380px;
  margin-top: 20px;
  border: 1px solid black;
`;

export const CardSlider = styled(Slider)`
border: 1px solid red;
`;

export const TmpCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 335px;
  background-color: transparent;
  /* img {
    border: 1px solid black;
  } */
`;

// CustomDots.tsx ---------------------------------- //
export const CustomDotsLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  margin-top: 20px;
`;
