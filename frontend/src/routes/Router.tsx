import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChartPage from '../pages/ChartPage/ChartPage';
import MonitoringPage from '../pages/MonitoringPage/MonitoringPage';
import IncidentHistoryPage from '../pages/IncidentHistoryPage/IncidentHistoryPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import Layout from '../components/common/Sidebar/Layout';
import TestPage from '../pages/TestPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/history" element={<IncidentHistoryPage />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
