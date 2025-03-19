import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MonitoringPage from '../pages/MonitoringPage';
import ChartPage from '../pages/ChartPage';
import TestPage from '../pages/TestPage';
import IncidentHistoryPage from '../pages/IncidentHistoryPage';
import { Sidebar } from '../components/common/Sidebar/Sidebar';
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/history" element={<IncidentHistoryPage />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/test" element={<TestPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
