import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';
import * as S from './Sidebar/Sidebar.style';
import RealTimeAlert from '@/components/RealTimeAlert/RealTimeAlert';

const Layout = () => {
  return (
    <S.Layout>
      <Sidebar />
      <S.MainContent>
        <Outlet />
      </S.MainContent>
      <RealTimeAlert/>
    </S.Layout>
  );
};

export default Layout;
