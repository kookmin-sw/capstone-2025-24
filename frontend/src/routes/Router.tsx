import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MonitoringPage from '../pages/MonitoringPage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MonitoringPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
