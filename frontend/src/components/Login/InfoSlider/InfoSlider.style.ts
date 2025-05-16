import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick';
import Lottie from 'lottie-react';

// InfoSlider.tsx ----------------------------- //
export const InfoSliderLayout = styled.div`
  width: 100%;
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

export const SpreadBell = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  top: 55%;
  left: 17%;
  transform: translate(-50%, -50%);
`;

export const SpreadMarker = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  top: 15%;
  left: 65%;
  transform: translate(-50%, -50%);
`;

const spread = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.2);
    opacity: 0.1;
  }
`;

export const RippleCircle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  animation: ${spread} 1.7s ease-out infinite;
  z-index: 0;
`;

export const InnerImage = styled.img`
  width: 43px;
  height: 43px;
  z-index: 1;
  position: relative;
`;

// CustomDots.tsx ---------------------------------- //
export const CustomDotsLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
`;
