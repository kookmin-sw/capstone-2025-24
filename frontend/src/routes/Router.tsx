import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MonitoringPage from '../pages/Monitoring/page';
import ChartPage from '../pages/ChartPage/page';
import IncidentHistoryPage from '../pages/IncidentHistory/page';
import { Sidebar } from '../components/common/Sidebar/Sidebar';
const Router: React.FC = () => {
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
