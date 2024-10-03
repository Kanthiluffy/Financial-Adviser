import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginFlow from './components/auth/LoginFlow';  // No curly braces for default exports
import AdminDashboard from './components/dashboards/AdminDashboard';  // No curly braces for default exports
import UserDashboard from './components/dashboards/UserDashboard';  // No curly braces for default exports
import MainSurvey from './components/survey/MainSurvey';
import { Container, CssBaseline } from '@mui/material';
import Home from './pages/Home/Home'
import Header from '../src/components/common/Header/Header'
import Footer from '../src/components/common/Footer/Footer'
const App = () => {
  
  return (
    <Router>
          <Header />

      <Routes>
        <Route path="/" element={<LoginFlow />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/survey" element={<MainSurvey />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;




// // import AssetsLiabilitiesPage from './AssetsLiabilitiesPage';
// // import IncomeExpensesPage from './IncomeExpensesPage';
// // import InvestmentsRetirementPage from './InvestmentsRetirementPage';
// // import LifeInsurancePage from './LifeInsurancePage';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import { Container, CssBaseline } from '@mui/material';
// import LoginFlow from './components/auth/LoginFlow';  // No curly braces for default exports
// import AdminDashboard from './components/dashboards/AdminDashboard';  // No curly braces for default exports
// import UserDashboard from './components/dashboards/UserDashboard';  // No curly braces for default exports


// // Color palette
// const colors = {
//   primary: "#08D9D6",
//   secondary: "#252A34",
//   accent: "#FF2E63",
//   light: "#EAEAEA",
// };

// function App() {
//   return (
//     <Router>
//       <CssBaseline />
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         {/* Breadcrumbs for Navigation */}
//         {/* <Breadcrumbs sx={{ mb: 4 }}>
//           <Link to="/survey" style={{ color: colors.primary }}>Demographics</Link>
//           <Link to="/goals" style={{ color: colors.primary }}>Goals</Link>
//           <Link to="/assets-liabilities" style={{ color: colors.primary }}>Assets & Liabilities</Link>
//           <Link to="/income-expenses" style={{ color: colors.primary }}>Income & Expenses</Link>
//           <Link to="/investments-retirement" style={{ color: colors.primary }}>Investments & Retirement</Link>
//           <Link to="/life-insurance" style={{ color: colors.primary }}>Life Insurance</Link>
//         </Breadcrumbs> */}

//         <Routes>
//           {/* <Route path="/" element={<LoginFlow />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/user-dashboard" element={<UserDashboard />} /> */}
//           <Route path="/survey" element={<MainSurvey />} />
//           {/* <Route path="/goals" element={<GoalsPage />} /> */}
//           {/* <Route path="/assets-liabilities" element={<AssetsLiabilitiesPage />} />
//           <Route path="/income-expenses" element={<IncomeExpensesPage />} />
//           <Route path="/investments-retirement" element={<InvestmentsRetirementPage />} />
//           <Route path="/life-insurance" element={<LifeInsurancePage />} /> */}
//         </Routes>
//       </Container>
//     </Router>
//   );
// }

// export default App;
