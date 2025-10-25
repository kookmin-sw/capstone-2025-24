import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import * as S from './InfoSection.style';
import { CctvInfo } from '@/types/cctv';
import { useSelectedCctvStore } from '@/stores/selectedCctvStore';

interface VideoPlayerProps {
  locations: CctvInfo[];
}

const VideoPlayer = ({ locations }: VideoPlayerProps) => {
  const { selectedIndex } = useSelectedCctvStore();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const target = locations.find((loc) => loc.id === selectedIndex);
    if (!target || !videoRef.current) return;

    const video = videoRef.current;
    const hls = new Hls();
    let localVideoPath = '';
    if (selectedIndex === 1) {
      localVideoPath = 'https://github.com/user-attachments/assets/22ed78b5-5492-49b0-adcd-c4ca4dd404da';
    } else if (selectedIndex == 2) {
      localVideoPath = 'https://github.com/user-attachments/assets/740b160c-b36e-494b-9863-ce017d6161e1';
    } else if (selectedIndex == 3) {
      localVideoPath = 'https://github.com/user-attachments/assets/f2bda60e-c210-4a0f-9162-4ca4692e8f2d';
    } else if (selectedIndex == 4) {
      localVideoPath = 'https://github.com/user-attachments/assets/6e83b7cb-407e-43b5-8f35-8333341ffae7';
    } else if (selectedIndex == 5) {
      localVideoPath = 'https://github.com/user-attachments/assets/71d9d0c2-4126-4244-b08c-f80529ac0aa9';
    }
    video.src = localVideoPath;
    video.load();
    video.play();

    return () => {
      hls.destroy();
    };
  }, [selectedIndex, locations]);

  return <S.VideoPlayer ref={videoRef} muted autoPlay playsInline className="videoPlayer" />;
};

export default VideoPlayer;
