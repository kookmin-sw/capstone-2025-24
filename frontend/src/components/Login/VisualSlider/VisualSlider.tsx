import * as S from './VisualSlider.style.ts';
import { Settings } from 'react-slick';
import LOGINCCTV from '@/assets/images/login_cctv.svg';
import LOGINCHART from '@/assets/images/login_chart.svg';
import LOGINMONITOR from '@/assets/images/login_monitor.svg';
import CustomDots from './CustomDots.tsx';
const VisualSlider = () => {
  const images: string[] = [LOGINCCTV, LOGINCHART, LOGINMONITOR];
  const settings: Settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    appendDots: CustomDots,
    dotsClass: 'dots_custom',
  };

  return (
    <S.VisualSliderLayout>
      <S.CardSlider {...settings}>
        {images.map((it, idx) => (
          <S.TmpCard key={it}>
            <img src={it} alt={`${idx}`} />
          </S.TmpCard>
        ))}
      </S.CardSlider>
    </S.VisualSliderLayout>
  );
};

export default VisualSlider;
