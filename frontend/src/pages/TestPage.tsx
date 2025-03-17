import { Sidebar } from '../components/common/Sidebar/Sidebar';
import styled from 'styled-components';

const TestPage = () => {
  return (
    <TestPageLayout>
      <Sidebar />
    </TestPageLayout>
  );
};

export default TestPage;

const TestPageLayout = styled.div`
  width: 100vh;
  height: 100vh;
`;
