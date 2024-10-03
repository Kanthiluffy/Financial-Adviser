import React, { useState } from 'react';
import { Box, Container, CssBaseline, Button, Breadcrumbs,GlobalStyles, ThemeProvider, Link, Typography } from '@mui/material';
import axios from 'axios';

// Import the section components
import Demographics from './Demographics';
import Goals from './Goals';
import AssetsAndLiabilities from './AssetsAndLiabilities';
import IncomeAndExpenses from './IncomeAndExpenses';
import InvestmentsAndRetirement from './InvestmentsAndRetirement';
import LifeInsurance from './LifeInsurance';

const MainSurvey = () => {
  const [step, setStep] = useState(0); // Manage current step
  const [surveyData, setSurveyData] = useState({
    age: '',
    maritalStatus: '',
    spouseAge: '',
    hasChildren: false,
    numberOfChildren: '',
    childrenAges: [],
    isRetired: false,
    yearsUntilRetirement: '',
    spouseRetired: false,
    spouseYearsUntilRetirement: '',
    saveForCollege: false,
    collegeTuitionPercentage: '',
    ownHome: false,
    homeLoanAmount: '',
    homeValue: '',
    mortgagePayment: '',
    otherRealEstate: false,
    otherRealEstateValue: '',
    otherRealEstateLoanAmount: '',
    otherRealEstateMortgagePayment: '',
    studentLoans: false,
    studentLoanBalance: '',
    otherDebts: false,
    otherDebtDetails: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    temporaryExpenses: false,
    temporaryExpenseDetails: '',
    annualTravelExpenses: '',
    lifeInsurancePremium: '',
    taxableAssets: '',
    emergencySavings: '',
    retirementAccounts: false,
    retirementAccountDetails: {
      previousEmployer401k: false,
      currentEmployer401k: false,
      roth401k: false,
      contributions: '',
    },
    hsaBalance: '',
    hsaContributions: '',
    lifeInsuranceCashValue: '',
    termLifeInsurance: false,
    termLifeInsuranceDetails: {
      faceAmount: '',
      coveragePeriod: '',
      livingBenefits: false,
    },
    cashValueLifeInsurance: false,
    cashValueLifeInsuranceDetails: '',
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleChange = (sectionData) => {
    setSurveyData((prevData) => ({
      ...prevData,
      ...sectionData,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found, unable to submit survey.');
        return;
      }

      // Send survey data with Authorization header
      const response = await axios.post('http://localhost:5000/api/survey/submit', surveyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log('Survey submitted successfully', response.data);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Demographics data={surveyData} onChange={handleChange} />;
      case 1:
        return <Goals data={surveyData} onChange={handleChange} />;
      case 2:
        return <AssetsAndLiabilities data={surveyData} onChange={handleChange} />;
      case 3:
        return <IncomeAndExpenses data={surveyData} onChange={handleChange} />;
      case 4:
        return <InvestmentsAndRetirement data={surveyData} onChange={handleChange} />;
      case 5:
        return <LifeInsurance data={surveyData} onChange={handleChange} />;
      default:
        return <Typography>No step found</Typography>;
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {/* Breadcrumbs for navigation */}
        <Breadcrumbs sx={{ marginBottom: '20px' }}>
          <Link onClick={() => setStep(0)} sx={{ color: step === 0 ? '#08D9D6' : '#252A34' }}>Demographics</Link>
          <Link onClick={() => setStep(1)} sx={{ color: step === 1 ? '#08D9D6' : '#252A34' }}>Goals</Link>
          <Link onClick={() => setStep(2)} sx={{ color: step === 2 ? '#08D9D6' : '#252A34' }}>Assets & Liabilities</Link>
          <Link onClick={() => setStep(3)} sx={{ color: step === 3 ? '#08D9D6' : '#252A34' }}>Income & Expenses</Link>
          <Link onClick={() => setStep(4)} sx={{ color: step === 4 ? '#08D9D6' : '#252A34' }}>Investments & Retirement</Link>
          <Link onClick={() => setStep(5)} sx={{ color: step === 5 ? '#08D9D6' : '#252A34' }}>Life Insurance</Link>
        </Breadcrumbs>

        {/* Render the current section */}
        <Box sx={{ bgcolor: '#252A34', padding: '30px', borderRadius: '12px', color: '#EAEAEA' }}>
          {renderStep()}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button disabled={step === 0} onClick={handleBack} sx={{ bgcolor: '#08D9D6' }}>Back</Button>
            {step === 5 ? (
              <Button onClick={handleSubmit} sx={{ bgcolor: '#08D9D6' }}>Submit</Button>
            ) : (
              <Button onClick={handleNext} sx={{ bgcolor: '#08D9D6' }}>Next</Button>
            )}
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default MainSurvey;
