import { useState } from 'react';
import KakaoMap from './KakaoMap';
import InfoBox from './InfoBox';
import * as S from './InfoSection.style';
import VideoPlayer from './VideoPlayer';
import { useEffect } from 'react';
import { CctvInfo } from '@/types/cctv';
import { getCctvInfo } from '@/apis/CctvApi';

const InfoSection = () => {
  const [cctv, setCctv] = useState<CctvInfo[]>([]);

  useEffect(() => {
    const fetchCctv = async () => {
      const data = await getCctvInfo();
      setCctv(data);
    };

    fetchCctv();
  }, []);
  return (
    <S.InfoLayout>
      <S.InfoContent>
        <KakaoMap Locations={cctv} />
        <InfoBox Locations={cctv} />
      </S.InfoContent>
      <VideoPlayer Locations={cctv} />
    </S.InfoLayout>
  );
};

export default InfoSection;
