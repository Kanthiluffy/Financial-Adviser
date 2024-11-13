import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginFlow from './components/auth/LoginFlow';  // No curly braces for default exports
import EmailLoginFlow from './components/auth/EmailLoginFlow';
import UserDashboard from './components/userDashboard/dashboard';
import MainSurvey from './components/survey/MainSurvey';
import LandingPage from './components/LandingPage';
const App = () => {
  
  return (
    <Router>
  
      <Routes>
        <Route path="/login" element={<EmailLoginFlow />} />
        <Route path="/landingpage" element={<LandingPage/>} />
        <Route path="/" element={<UserDashboard/>} />
        <Route path="/survey" element={<MainSurvey />} />
      </Routes>
     
    </Router>
  );
};

export default App;

