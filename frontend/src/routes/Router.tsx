import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MonitoringPage from '../pages/MonitoringPage/MonitoringPage';
import ChartPage from '../pages/ChartPage';
import IncidentHistoryPage from '../pages/IncidentHistoryPage';
import SidebarLayout from '../components/layouts/SideBarLayout';
import LoginPage from '../pages/LoginPage/LoginPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 사이드바 없는 페이지 */}
        <Route path="/" element={<LoginPage />} />

        {/* 사이드바 있는 페이지 */}
        <Route element={<SidebarLayout />}>
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/history" element={<IncidentHistoryPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
