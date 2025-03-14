import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import MonitorPage from '../pages/MonitorPage';
import Test from '../pages/1/2/3/4/5/test';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MonitorPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
