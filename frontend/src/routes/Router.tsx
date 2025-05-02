import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChartPage from '../pages/ChartPage/ChartPage';
import MonitoringPage from '../pages/MonitoringPage/MonitoringPage';
import IncidentHistoryPage from '../pages/IncidentHistoryPage/IncidentHistoryPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import Layout from '../components/common/Sidebar/Layout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/history" element={<IncidentHistoryPage />} />
            <Route path="/chart" element={<ChartPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
