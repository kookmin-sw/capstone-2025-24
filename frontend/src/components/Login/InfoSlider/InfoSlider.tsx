import * as S from './InfoSlider.style.ts';
import { Settings } from 'react-slick';
import CustomDots from './CustomDots.tsx';
import loginCctv from '@/assets/images/loginCctv.svg';
import loginChart from '@/assets/images/charts.svg';
import loginMonitor from '@/assets/images/loginMonitor.svg';
import fluid from '@/assets/images/fluid.svg';
import bell from '@/assets/images/bellCircle.svg';
import marker from '@/assets/images/markerCircle.svg';
import cctvBgd from '@/assets/lottie/cctvBackground.json';
import plus from '@/assets/icons/plus.svg';

const InfoSlider = () => {
  const settings: Settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    // autoplay: true,
    // autoplaySpeed: 3200,
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
      </S.CardSlider>
    </S.InfoSliderLayout>
  );
};

export default InfoSlider;
