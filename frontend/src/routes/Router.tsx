import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MonitoringPage from '@/pages/MonitoringPage/MonitoringPage';
import ChartPage from '@/pages/ChartPage';
import IncidentHistoryPage from '@/pages/IncidentHistoryPage/IncidentHistoryPage';
import { Sidebar } from '@/components/common/Sidebar/Sidebar';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/history" element={<IncidentHistoryPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
