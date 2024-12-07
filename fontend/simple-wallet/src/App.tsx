import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Wallet from './pages/Wallet'; // 确保 Wallet 页面存在

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 定义 /wallet 页面 */}
        <Route path="/wallet" element={<Wallet />} />
        {/* 捕获所有其他路径并重定向到 /wallet */}
        <Route path="*" element={<Navigate to="/wallet" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
