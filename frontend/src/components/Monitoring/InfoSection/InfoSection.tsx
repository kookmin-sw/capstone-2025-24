import { useState } from 'react';
import KakaoMap from './KakaoMap';
import InfoBox from './InfoBox';
import * as S from './InfoSection.style';
import VideoPlayer from './VideoPlayer';
import { useEffect } from 'react';
import { CctvInfo } from '@/types/cctv';
import { getCctvInfo } from '@/apis/CctvApi';

const InfoSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
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
        <KakaoMap selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} Locations={cctv} />
        <InfoBox selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} Locations={cctv} />
      </S.InfoContent>
      <VideoPlayer selectedIndex={selectedIndex} Locations={cctv} />
    </S.InfoLayout>
  );
};

export default InfoSection;
