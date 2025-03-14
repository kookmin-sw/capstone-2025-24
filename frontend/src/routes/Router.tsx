import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MonitorPage from '../pages/MonitorPage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MonitorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
