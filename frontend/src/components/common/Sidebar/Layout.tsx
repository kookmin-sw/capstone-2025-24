import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MainContent } from './style';
const Layout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
};

export default Layout;
