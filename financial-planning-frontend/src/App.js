import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmailLoginFlow from './components/auth/EmailLoginFlow';
import UserDashboard from './components/userDashboard/dashboard';
import MainSurvey from './components/survey/MainSurvey';
import LandingPage from './components/LandingPage';

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<EmailLoginFlow />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/survey" element={<MainSurvey />} />

        {/* Protected Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect all undefined routes to /landingpage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
