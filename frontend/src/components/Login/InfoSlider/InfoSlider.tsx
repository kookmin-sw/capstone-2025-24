import * as S from './InfoSlider.style.ts';
import { Settings } from 'react-slick';
import LOGINCCTV from '@/assets/images/loginCctv.svg';
import LOGINCHART from '@/assets/images/charts.svg';
import LOGINMONITOR from '@/assets/images/loginMonitor.svg';
import CustomDots from './CustomDots.tsx';
import PLUS from '@/assets/icons/plus.svg';
import FLUID from '@/assets/images/fluid.svg';
import CCTVBGD from '@/assets/lottie/tmp.json';

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
    dotsClass: 'dots_custom',
  };

  return (
    <S.InfoSliderLayout>
      <S.CardSlider {...settings}>
        <S.SlideCard>
          <S.Background animationData={CCTVBGD} />
          <img src={LOGINCCTV} alt="img1" />
        </S.SlideCard>
        <S.SlideCard>
          <img src={FLUID} alt="img2" className="fluid" />
          <img src={LOGINCHART} alt="img2" className="floating" />
          <img src={PLUS} alt="plus" className="plus1" />
          <img src={PLUS} alt="plus" className="plus2" />
        </S.SlideCard>
        <S.SlideCard>
          <img src={LOGINMONITOR} alt="img3" />
        </S.SlideCard>
      </S.CardSlider>
    </S.InfoSliderLayout>
  );
};

export default InfoSlider;
