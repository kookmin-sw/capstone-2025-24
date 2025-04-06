import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChartPage from '../pages/ChartPage/page';
import MonitoringPage from '../pages/MonitoringPage/MonitoringPage';
import IncidentHistoryPage from '../pages/IncidentHistoryPage/IncidentHistoryPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import Layout from '../components/common/Sidebar/Layout';
import RealTimeAlert from '@/components/RealTimeAlert/RealTimeAlert.tsx';

const Router = () => {
  return (
    <BrowserRouter>
      <RealTimeAlert />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/history" element={<IncidentHistoryPage />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route element={<RealTimeAlert />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
