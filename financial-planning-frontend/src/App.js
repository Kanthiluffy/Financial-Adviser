import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginFlow from './components/auth/LoginFlow';  // No curly braces for default exports
import AdminDashboard from './components/dashboards/AdminDashboard';  // No curly braces for default exports
import UserDashboard from './components/dashboards/UserDashboard';  // No curly braces for default exports

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginFlow />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
