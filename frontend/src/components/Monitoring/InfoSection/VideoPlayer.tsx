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
      localVideoPath = 'https://github.com/user-attachments/assets/47bdc8a5-68d1-4edd-8d42-6e06272358b9';
    } else if (selectedIndex == 2) {
      localVideoPath = 'https://github.com/user-attachments/assets/47bdc8a5-68d1-4edd-8d42-6e06272358b9';
    } else if (selectedIndex == 3) {
      localVideoPath = 'https://github.com/user-attachments/assets/47bdc8a5-68d1-4edd-8d42-6e06272358b9';
    } else if (selectedIndex == 4) {
      localVideoPath = 'https://github.com/user-attachments/assets/47bdc8a5-68d1-4edd-8d42-6e06272358b9';
    } else if (selectedIndex == 5) {
      localVideoPath = 'https://github.com/user-attachments/assets/47bdc8a5-68d1-4edd-8d42-6e06272358b9';
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
