import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import * as S from './InfoSection.style';

interface VideoPlayerProps {
  selectedIndex: number | null;
  Locations: {
    cctvUrl: string;
  }[];
}

const VideoPlayer = ({ selectedIndex, Locations }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const index = selectedIndex;

    if (!Locations[index]) return;

    const video = videoRef.current;
    const hls = new Hls();

    if (video && Hls.isSupported()) {
      hls.loadSource(Locations[index].cctvUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = Locations[index].cctvUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }

    return () => {
      hls.destroy();
    };
  }, [selectedIndex, Locations]);

  return <S.VideoPlayer ref={videoRef} muted autoPlay playsInline />;
};

export default VideoPlayer;
