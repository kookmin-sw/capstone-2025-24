import VideoPlayer from '@/components/Monitoring/InfoSection/VideoPlayer';

const TestPage = () => {
  return (
    <div>
      <h2>🔥 Video.js 테스트</h2>
      <VideoPlayer />
      {/* <video style={{ width: '640px', height: '360px' }} controls autoPlay muted>
        <source src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" type="application/x-mpegURL" />
      </video> */}
    </div>
  );
};

export default TestPage;
