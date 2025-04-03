import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const RawHLSPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const hls = new Hls();

    if (video && Hls.isSupported()) {
      hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari 같은 브라우저
      video.src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }

    return () => {
      hls.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      muted
      style={{ width: '640px', height: '360px' }}
    />
  );
};

export default RawHLSPlayer;
