import styled from 'styled-components';
import Slider from 'react-slick';

// VisualSlider.tsx ----------------------------- //
export const VisualSliderLayout = styled.div`
  width: 440px;
  height: 380px;
  margin-top: 40px;
`;

export const CardSlider = styled(Slider)`
:focus {
  border: none;
}
`;

export const TmpCard = styled.div`
  position: relative;
  width: 100%;
  height: 335px;
  background-color: transparent;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
  }
`;




// CustomDots.tsx ---------------------------------- //
export const CustomDotsLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
`;
