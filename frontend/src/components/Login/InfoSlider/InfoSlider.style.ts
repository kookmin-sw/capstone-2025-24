import styled from 'styled-components';
import Slider from 'react-slick';
import Lottie from 'lottie-react';
// InfoSlider.tsx ----------------------------- //
export const InfoSliderLayout = styled.div`
  width: 440px;
  height: 380px;
  margin-top: 60px;
`;

export const CardSlider = styled(Slider)`
  :focus {
    outline: none !important;
  }
`;

export const SlideCard = styled.div`
  position: relative;
  width: 100%;
  height: 335px;
  background-color: transparent;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .plus1 {
    position: absolute;
    left: 9%;
    top: 49%;
    animation: rotatePlus 2s ease-in-out infinite;
  }

  .plus2 {
    position: absolute;
    top: 90%;
    left: 83%;
    animation: rotatePlus 2s ease-in-out infinite;
  }

  @keyframes rotatePlus {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .floating {
    animation: floatY 2.5s ease-in-out infinite;
  }

  @keyframes floatY {
    0% {
      transform: translate(-50%, -47%);
    }
    50% {
      transform: translate(-50%, -45%);
    }
    100% {
      transform: translate(-50%, -47%);
    }
  }

  .fluid {
    width: 90%;
    height: 90%;
  }
`;

export const Background = styled(Lottie)`
  position: absolute;
  top: -10%;
  left: 7%;
  width: 370px;
  height: 370px;
  transform: rotate(160deg);
`;

// CustomDots.tsx ---------------------------------- //
export const CustomDotsLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
`;
