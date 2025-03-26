import { Outlet } from 'react-router-dom';
import { Sidebar } from '../common/Sidebar/Sidebar';

const SidebarLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default SidebarLayout;