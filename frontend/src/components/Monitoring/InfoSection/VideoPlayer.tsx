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
    if (!target) return;

    const video = videoRef.current;
    const hls = new Hls();

    if (video && Hls.isSupported()) {
      hls.loadSource(target.liveUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = target.liveUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }

    return () => {
      hls.destroy();
    };
  }, [selectedIndex, locations]);

  return <S.VideoPlayer ref={videoRef} muted autoPlay playsInline />;
};

export default VideoPlayer;
