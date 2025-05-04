import * as S from './InfoSlider.style.ts';
import { Settings } from 'react-slick';
import CustomDots from './CustomDots.tsx';
import cctvBgd from '@/assets/lottie/cctvBackground.json';
import plus from '@/assets/icons/plus.svg';

import { loginCctv, loginChart, loginMonitor, fluid, bell, marker } from '@/assets/images';

const InfoSlider = () => {
  const settings: Settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3200,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    appendDots: CustomDots,
    dotsClass: 'dots-custom',
  };

  return (
    <S.InfoSliderLayout>
      <S.CardSlider {...settings}>
        <S.SlideCard>
          <S.Background animationData={cctvBgd} />
          <img src={loginCctv} alt="img1" />
        </S.SlideCard>
        <S.SlideCard>
          <img src={fluid} alt="img2" className="fluid" />
          <img src={loginChart} alt="img2" className="floating" />
          <img src={plus} alt="plus" className="plus1" />
          <img src={plus} alt="plus" className="plus2" />
        </S.SlideCard>
        <S.SlideCard>
          <img src={loginMonitor} alt="img3" />
          <S.SpreadBell>
            <S.RippleCircle />
            <S.InnerImage src={bell} alt="bell" />
          </S.SpreadBell>
          <S.SpreadMarker>
            <S.RippleCircle />
            <S.InnerImage src={marker} alt="marker" />
          </S.SpreadMarker>
        </S.SlideCard>
      </S.CardSlider>
    </S.InfoSliderLayout>
  );
};

export default InfoSlider;
