import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import * as S from './Sidebar.style';

const Layout = () => {
  return (
    <S.Layout>
      <Sidebar />
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.Layout>
  );
};

export default Layout;
