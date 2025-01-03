import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmailLoginFlow from './components/auth/EmailLoginFlow';
import UserDashboard from './components/userDashboard/dashboard';
import MainSurvey from './components/survey/MainSurvey';
import LandingPage from './components/LandingPage';
import EditMyPlan from './components/userDashboard/edit-my-plan/EditMyPlan';
import Calc from './components/Calc';
import { Calculator } from 'lucide-react';
// import Assumptions from './components/Assumptions';
// import IncomeTaxBrackets from './components/IncomeTaxBrackets';
// import EstateTaxBrackets from './components/EstateTaxBrackets';
// import ReferAFriend from './components/ReferAFriend';
// import TermsAndConditions from './components/TermsAndConditions';
// import Disclaimer from './components/Disclaimer';

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
        <Route path="/calc" element={<Calc />} />

        {/* Protected Routes */}
        <Route path="/user-dashboard" element={<ProtectedRoute> <UserDashboard /></ProtectedRoute>} />
        <Route path="/edit" element={<ProtectedRoute> <EditMyPlan /></ProtectedRoute>} />
        {/* <Route path="/assumptions" element={<ProtectedRoute> <Assumptions /></ProtectedRoute>} />
        <Route path="/income-tax" element={<ProtectedRoute> <IncomeTaxBrackets /></ProtectedRoute>} />
        <Route path="/estate-tax" element={<ProtectedRoute> <EstateTaxBrackets /></ProtectedRoute>} />
        <Route path="/refer" element={<ProtectedRoute> <ReferAFriend /></ProtectedRoute>} />
        <Route path="/terms" element={<ProtectedRoute> <TermsAndConditions /></ProtectedRoute>} />
        <Route path="/disclaimer" element={<ProtectedRoute> <Disclaimer /></ProtectedRoute>} /> */}

        {/* Redirect all undefined routes to /landingpage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
