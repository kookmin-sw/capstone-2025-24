import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import * as S from './InfoSection.style';
import { CctvInfo } from '@/types/cctv';
import { useSelectedCctvStore } from '@/stores/selectedCctvStore';
import styled from 'styled-components';

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
      setIsLoading(true);
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
      setIsLoading(true);
      const localVideoPath = 'https://github.com/user-attachments/assets/22ed78b5-5492-49b0-adcd-c4ca4dd404da';

      video.src = localVideoPath;
      video.load();
      video.play();
    } else if (selectedIndex == 3) {
      setIsLoading(true);
      const localVideoPath = 'https://github.com/user-attachments/assets/740b160c-b36e-494b-9863-ce017d6161e1';

      video.src = localVideoPath;
      video.load();
      video.play();
    } else if (selectedIndex == 4) {
      setIsLoading(true);
      const localVideoPath = 'https://github.com/user-attachments/assets/f2bda60e-c210-4a0f-9162-4ca4692e8f2d';

      video.src = localVideoPath;
      video.load();
      video.play();
    } else if (selectedIndex == 5) {
      setIsLoading(true);
      const localVideoPath = 'https://github.com/user-attachments/assets/6e83b7cb-407e-43b5-8f35-8333341ffae7';

      video.src = localVideoPath;
      video.load();
      video.play();
    }

    return () => {
      hls.destroy();
    };
  }, [selectedIndex, locations]);

  const [isLoading, setIsLoading] = useState(true);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <VideoWrapper>
      {isLoading && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}

      <S.VideoPlayer
        ref={videoRef}
        onLoadedData={handleLoadedData}
        muted
        autoPlay
        playsInline
        className="videoPlayer"
      />
    </VideoWrapper>
  );
};

export default VideoPlayer;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.2);
  border-top: 4px solid #5973ee;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
