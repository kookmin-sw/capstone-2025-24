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

    if (selectedIndex === 1) {
      if (Hls.isSupported()) {
        hls.loadSource(target.liveUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = target.liveUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      }
    } else if (selectedIndex == 2) {
      const localVideoPath = 'https://github.com/user-attachments/assets/22ed78b5-5492-49b0-adcd-c4ca4dd404da';

      video.src = localVideoPath;
      video.load();
      video.play();
    } else if (selectedIndex == 3) {
      const localVideoPath = 'https://github.com/user-attachments/assets/740b160c-b36e-494b-9863-ce017d6161e1';

      video.src = localVideoPath;
      video.load();
      video.play();
    } else if (selectedIndex == 4) {
      const localVideoPath = 'https://github.com/user-attachments/assets/f2bda60e-c210-4a0f-9162-4ca4692e8f2d';

      video.src = localVideoPath;
      video.load();
      video.play();
    } else if (selectedIndex == 5) {
      const localVideoPath = 'https://github.com/user-attachments/assets/6e83b7cb-407e-43b5-8f35-8333341ffae7';

      video.src = localVideoPath;
      video.load();
      video.play();
    }

    return () => {
      hls.destroy();
    };
  }, [selectedIndex, locations]);

  return <S.VideoPlayer ref={videoRef} muted autoPlay playsInline className="videoPlayer" />;
};

export default VideoPlayer;
