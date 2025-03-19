import styled from 'styled-components';
import VideoComponent from '../components/common/VideoComponent/VideoComponent';

const TestPage = () => {
  return (
    <TestPageLayout>
      <VideoComponent w={200} h={200} radius={10} videoUrl='https://youtu.be/h0KIWaUEIgQ?si=nh83Vx1n8tsOzuKV'/>
    </TestPageLayout>
  );
};

export default TestPage;

const TestPageLayout = styled.div`
  width: 100vh;
  height: 100vh;
`;
