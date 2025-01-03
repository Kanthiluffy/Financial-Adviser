import React, { useState,useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/MainSurvey.css';


const surveySections = [
  {
    title: "Demographics Section",
    questions: [
      { 
        id: 58, 
        type: 'nametext', 
        label: 'What is your name?', 
        field: 'name', 
        validation: { required: true, errorMessage: 'Name is required.' } 
      },
      { id: 1, type: 'number', label: 'What is your age?', field: 'age', validation: { required: true, errorMessage: 'Age is required.' } },
      { id: 2, type: 'radio', label: 'Marital Status', field: 'maritalStatus', options: [{ value: 'single', label: 'I am single' }, { value: 'married', label: 'I am in a relationship/married' }], validation: { required: true, errorMessage: 'Marital status is required.' } },
      { id: 3, type: 'number', label: "What is your spouse/partner's age?", field: 'spouseAge', condition: (data) => data.maritalStatus === 'married', validation: { required: true, errorMessage: 'Spouse age is required when married.' } },
    ],
  },
  {
    title: "Children Section",
    questions: [
      { id: 4, type: 'yesno', label: 'Do you have children?', field: 'hasChildren' },
      { id: 5, type: 'number', label: 'Number of children?', field: 'numberOfChildren', condition: (data) => data.hasChildren === true, validation: { required: true, errorMessage: 'Number of children is required if you have children.' } },
      { id: 6, type: 'dynamicChildrenAges', label: 'Ages of your children', field: 'childrenAges', condition: (data) => data.hasChildren && data.numberOfChildren > 0, validation: { required: true, errorMessage: 'Please provide the ages of your children.' } },
    ],
  },
  {
    title: "Goals Section",
    questions: [
      { id: 7, type: 'yesno', label: 'Are you already retired?', field: 'isRetired' },
      { id: 8, type: 'number', label: 'How many more years do you plan to work?', field: 'yearsUntilRetirement', condition: (data) => data.isRetired === false, validation: { required: true, errorMessage: 'Please specify years until retirement.' } },
      { id: 9, type: 'yesno', label: 'Is your spouse/partner already retired?', field: 'spouseRetired', condition: (data) => data.maritalStatus === 'married' },
      { id: 10, type: 'number', label: "How many more years does your spouse/partner plan to work?", field: 'spouseYearsUntilRetirement', condition: (data) => data.spouseRetired === false && data.maritalStatus === 'married', validation: { required: true, errorMessage: 'Please specify years spouse plans to work.' } },
      { id: 11, type: 'yesno', label: 'Are you planning to save for your kids’ college?', field: 'saveForCollege', condition: (data) => data.hasChildren === true,},
      { id: 12, type: 'number', label: '% of the college fee you would like to support?', field: 'collegeFeeSupportPercentage', condition: (data) => data.saveForCollege === true, validation: { required: true, errorMessage: 'Please specify the percentage you plan to support.' } },
    ],
  },
  {
    title: "Assets and Liabilities Section",
    questions: [
      { id: 13, type: 'yesno', label: 'Do you own your primary home?', field: 'ownHome' },
      { id: 14, type: 'number', label: 'Loan amount on your primary home?', field: 'homeLoanAmount', condition: (data) => data.ownHome === true, validation: { required: true, errorMessage: 'Provide loan amount on primary home.' } },
      { id: 15, type: 'number', label: 'Current value of your home?', field: 'homeValue', condition: (data) => data.ownHome === true, validation: { required: true, errorMessage: 'Provide home value.' } },
      { id: 16, type: 'number', label: 'Monthly mortgage and interest payment (excluding property taxes)?', field: 'monthlyMortgagePayment', condition: (data) => data.ownHome === true, validation: { required: true, errorMessage: 'Provide monthly mortgage payment.' } },
    ],
  },
  {
    title: "Other Real Estate Section",
    questions: [
      { id: 17, type: 'yesno', label: 'Do you own other real estate properties?', field: 'otherRealEstate' },
      { id: 18, type: 'number', label: 'Current value of other real estate properties?', field: 'otherRealEstateValue', condition: (data) => data.otherRealEstate, validation: { required: true, errorMessage: 'Provide value of other real estate.' } },
      { id: 19, type: 'number', label: 'Loan amount remaining on other real estate properties?', field: 'otherRealEstateLoan', condition: (data) => data.otherRealEstate, validation: { required: true, errorMessage: 'Provide loan amount on other real estate.' } },
      { id: 20, type: 'number', label: 'Monthly mortgage and interest payment on other real estate (excluding property taxes)?', field: 'otherRealEstateMortgage', condition: (data) => data.otherRealEstate, validation: { required: true, errorMessage: 'Provide monthly mortgage payment on other real estate.' } },
    ],
  },
  {
    title: "Student Loans and Other Debts",
    questions: [
      { id: 26, type: 'yesno', label: 'Do you have any student loans?', field: 'studentLoans' },
      { id: 27, type: 'number', label: 'What is the remaining balance on your student loans?', field: 'studentLoanBalance', condition: (data) => data.studentLoans === true, validation: { required: true, errorMessage: 'Remaining balance is required if you have student loans.' } },
      { id: 28, type: 'yesno', label: 'Do you have any other debts that need to be paid off?', field: 'otherDebts' },
      {
        id: 29, 
        type: 'dynamicDebtFields', 
        label: 'Please specify the type and amount of your other debts.', 
        field: 'otherDebtsDetails', 
        condition: (data) => data.otherDebts === true,
        validation: { required: true, errorMessage: 'Please provide details of your debts.' }
      }
    ],
  },
  {
    title: "Income",  
    questions: [
      { 
        id: 51, 
        type: 'number', 
        label: "What is your current monthly income?", 
        field: 'monthlyIncome', 
        validation: { required: true, errorMessage: 'Please provide your current monthly income.' } 
      },
      { 
        id: 52, 
        type: 'number', 
        label: "What is your spouse's current monthly income?", 
        field: 'spouseMonthlyIncome', 
        condition: (data) => data.maritalStatus === 'married' && data.spouseRetired === false, 
        validation: { required: true, errorMessage: 'Please provide your spouse\'s current monthly income.' } 
      },
      { 
        id: 53, 
        type: 'number', 
        label: "What are your current monthly expenses (excluding mortgages)?", 
        field: 'monthlyExpenses', 
        validation: { required: true, errorMessage: 'Please provide your monthly expenses.' } 
      }
    ],
  },
  {
    title: "Expenses",
    questions: [
      { 
        id: 54, 
        type: 'number', 
        label: "What are your temporary expenses?", 
        field: 'temporaryExpenses', 
        validation: { required: true, errorMessage: 'Please provide your temporary expenses.' } 
      },
      { 
        id: 55, 
        type: 'number', 
        label: "How many years do you plan to pay for your temporary expenses?", 
        field: 'temporaryExpenseYears', 
        validation: { required: true, errorMessage: 'Please specify the number of years for temporary expenses.' } 
      },
      { 
        id: 56, 
        type: 'number', 
        label: "What are your average travel expenses per year?", 
        field: 'annualTravelExpenses', 
        validation: { required: true, errorMessage: 'Please provide your travel expenses.' } 
      },
      { 
        id: 57, 
        type: 'number', 
        label: "What is the current monthly premium for your life insurance?", 
        field: 'lifeInsurancePremium', 
        validation: { required: true, errorMessage: 'Please provide your life insurance premium.' } 
      },
    ]
  },
  {
    title: "Investments and Emergency Savings",
    questions: [
      { id: 30, type: 'yesno', label: 'Do you have any current taxable assets (e.g., stocks, CDs, mutual funds, ETFs, crypto)', field: 'anytaxableAssets' },
      {
        id: 31, 
        type: 'dynamicAssetFields', 
        label: 'Please specify your current taxable assets', 
        field: 'taxableAssets', 
        condition: (data) => data.anytaxableAssets === true,
        validation: { required: true, errorMessage: 'Please provide details of your taxable assets.' }
      },
      { id: 32, type: 'number', label: 'What is your current emergency savings balance?', field: 'emergencySavings', validation: { required: true, errorMessage: 'Emergency savings balance is required.' } }
    ],
  },
  {
    title: "Retirement Details",
    questions: [
      {
        id: 33,
        type: 'yesno',
        label: 'Do you have retirement accounts?',
        field: 'retirementAccounts',
      },
      {
        id: 34,
        type: 'checkbox',
        label: 'Please specify your retirement accounts:',
        field: 'retirementAccountDetails',
        options: [
          { value: 'previousEmployer', label: 'Previous employer 401(k), IRA, SEP IRA (Pre-tax)' },
          { value: 'currentEmployer', label: 'Current employer 401(k)' },
          { value: 'roth', label: 'Roth 401(k), Roth IRA (Post-tax)' }
        ],
        condition: (data) => data.retirementAccounts === true,
      },
      {
        id: 34.1,
        type: 'number',
        label: 'Current value of your previous employer 401(k), IRA, SEP IRA (Pre-tax):',
        field: 'previousEmployerCurrentValue',
        condition: (data) => data.retirementAccountDetails?.includes('previousEmployer'),
        validation: { required: true, errorMessage: 'Please provide the current value.' }
      },
      {
        id: 34.2,
        type: 'number',
        label: 'Annual contribution to your previous employer 401(k), IRA, SEP IRA (Pre-tax):',
        field: 'previousEmployerAnnualContribution',
        condition: (data) => data.retirementAccountDetails?.includes('previousEmployer'),
        validation: { required: true, errorMessage: 'Please provide the annual contribution.' }
      },
      {
        id: 34.3,
        type: 'number',
        label: 'Matching amount for your previous employer 401(k), IRA, SEP IRA (Pre-tax):',
        field: 'previousEmployerMatchingAmount',
        condition: (data) => data.retirementAccountDetails?.includes('previousEmployer'),
        validation: { required: true, errorMessage: 'Please provide the matching amount.' }
      },
      {
        id: 34.4,
        type: 'number',
        label: 'Current value of your current employer 401(k):',
        field: 'currentEmployerCurrentValue',
        condition: (data) => data.retirementAccountDetails?.includes('currentEmployer'),
        validation: { required: true, errorMessage: 'Please provide the current value.' }
      },
      {
        id: 34.5,
        type: 'number',
        label: 'Annual contribution to your current employer 401(k):',
        field: 'currentEmployerAnnualContribution',
        condition: (data) => data.retirementAccountDetails?.includes('currentEmployer'),
        validation: { required: true, errorMessage: 'Please provide the annual contribution.' }
      },
      {
        id: 34.6,
        type: 'number',
        label: 'Matching amount for your current employer 401(k):',
        field: 'currentEmployerMatchingAmount',
        condition: (data) => data.retirementAccountDetails?.includes('currentEmployer'),
        validation: { required: true, errorMessage: 'Please provide the matching amount.' }
      },
      {
        id: 34.7,
        type: 'number',
        label: 'Current value of your Roth 401(k), Roth IRA (Post-tax):',
        field: 'rothCurrentValue',
        condition: (data) => data.retirementAccountDetails?.includes('roth'),
        validation: { required: true, errorMessage: 'Please provide the current value.' }
      },
      {
        id: 34.8,
        type: 'number',
        label: 'Annual contribution to your Roth 401(k), Roth IRA (Post-tax):',
        field: 'rothAnnualContribution',
        condition: (data) => data.retirementAccountDetails?.includes('roth'),
        validation: { required: true, errorMessage: 'Please provide the annual contribution.' }
      },
      {
        id: 34.9,
        type: 'number',
        label: 'Matching amount for your Roth 401(k), Roth IRA (Post-tax):',
        field: 'rothMatchingAmount',
        condition: (data) => data.retirementAccountDetails?.includes('roth'),
        validation: { required: true, errorMessage: 'Please provide the matching amount.' }
      },
      
      { id: 35, type: 'number', label: 'What is the current cash surrender value of your life insurance plans?', field: 'cashSurrenderValue', validation: { required: true, errorMessage: 'Please provide the cash surrender value of your life insurance if applicable.' }}
    ],
  },
  {
    title: "HSA Details",
    questions: [
      { id: 36, type: 'yesno', label: 'Do you have a Health Savings Account (HSA)?', field: 'hasHSA' },
      { id: 37, type: 'number', label: 'What is your annual contribution to your HSA?', field: 'hsaContribution', condition: (data) => data.hasHSA === true, validation: { required: true, errorMessage: 'Please provide your HSA contribution amount if applicable.' } },
      { id: 38, type: 'number', label: 'What is the current balance in your HSA?', field: 'hsaBalance', condition: (data) => data.hasHSA === true, validation: { required: true, errorMessage: 'Please provide your HSA balance if applicable.' } }
    ],
  },
  {
    title: "Annuities",
    questions: [
      { id: 39, type: 'yesno', label: 'Do you have any annuity accounts?', field: 'annuityAccounts' },
      { id: 40, type: 'number', label: 'What is the current value of your annuity?', field: 'annuityAmount', condition: (data) => data.annuityAccounts === true, validation: { required: true, errorMessage: 'Please provide the value of your annuity if applicable.' } },
      { id: 41, type: 'number', label: 'What is the estimated annuity income at retirement?', field: 'annuityIncomeAtRetirement', condition: (data) => data.annuityAccounts === true, validation: { required: true, errorMessage: 'Please specify your annuity income at retirement.' } },
    ],
  },
  {
    title: "Life Insurance Section",
    questions: [
      { id: 42, type: 'yesno', label: 'Do you have term life insurance coverage?', field: 'termLifeInsurance' },
      { id: 43, type: 'number', label: 'Face amount of your term life insurance?', field: 'termLifeInsuranceFaceAmount', condition: (data) => data.termLifeInsurance === true, validation: { required: true, errorMessage: 'Provide face amount of term life insurance.' } },
      { id: 44, type: 'number', label: 'Coverage period of your term life insurance?', field: 'termLifeInsuranceCoveragePeriod', condition: (data) => data.termLifeInsurance === true, validation: { required: true, errorMessage: 'Provide coverage period of term life insurance.' } },
      { id: 45, type: 'yesno', label: 'Does your term life insurance include living benefits?', field: 'termLifeInsuranceBenefits', condition: (data) => data.termLifeInsurance === true }
    ]
  },
  {
    title: "Cash Value Life Insurance Section",
    questions: [
      { id: 46, type: 'yesno', label: 'Do you have cash value life insurance (e.g., whole life, universal life, variable life)?', field: 'cashValueLifeInsurance' },
      { 
        id: 47, 
        type: 'dynamicPolicyFields', 
        label: 'What is the coverage amount for each policy?', 
        field: 'cashValueLifeInsuranceCoverage', 
        condition: (data) => data.cashValueLifeInsurance === true, 
        validation: { required: true, errorMessage: 'Please provide details of each life insurance policy.' }
      }
    ]
  },
  {
    title: "Long-Term Care Coverage",
    questions: [
      { id: 48, type: 'yesno', label: 'Do you have long-term care (LTC) insurance?', field: 'longTermCareCoverage' },
      { id: 49, type: 'number', label: 'What is the coverage amount of your LTC insurance?', field: 'ltcCoverageAmount', condition: (data) => data.longTermCareCoverage === true, validation: { required: true, errorMessage: 'Please specify the LTC coverage amount if applicable.' } },
      { id: 50, type: 'number', label: 'What is your monthly premium for LTC insurance?', field: 'ltcMonthlyPremiums', condition: (data) => data.longTermCareCoverage === true, validation: { required: true, errorMessage: 'Please specify the monthly LTC premium if applicable.' } },
    ],
  },
  
];

const MainSurvey = () => {
  const [surveyData, setSurveyData] = useState({
    name: '', 
    age: '',  
    maritalStatus: '', 
    spouseAge: '', 
    hasChildren: true, 
    numberOfChildren: '', 
    childrenAges: [],
    
    // Goals Section
    isRetired: true, 
    yearsUntilRetirement: '', 
    spouseRetired: true, 
    spouseYearsUntilRetirement: '',
    saveForCollege: false,  
    collegeFeeSupportPercentage: '',
    
    // Assets and Liabilities Section
    ownHome: true, 
    homeLoanAmount: '', 
    homeValue: '', 
    monthlyMortgagePayment: '',
    
    // Other Real Estate Section
    otherRealEstate: false, 
    otherRealEstateValue: '', 
    otherRealEstateLoan: '', 
    otherRealEstateMortgage: '',
    
    // Student Loans and Other Debts Section
    studentLoans: false, 
    studentLoanBalance: '', 
    otherDebts: false, 
    otherDebtsDetails: [{ description: '', amount: '' }],
    
    // Investments and Emergency Savings Section
    anytaxableAssets: false,
    taxableAssets: [], 
    emergencySavings: '',
    
    // Retirement Details Section
    retirementAccounts: true, 
    retirementAccountDetails: [], // Initialize as empty array for checkboxes
    previousEmployerCurrentValue: '',
    previousEmployerAnnualContribution: '',
    previousEmployerMatchingAmount: '',
    currentEmployerCurrentValue: '',
    currentEmployerAnnualContribution: '',
    currentEmployerMatchingAmount: '',
    rothCurrentValue: '',
    rothAnnualContribution: '',
    rothMatchingAmount: '',

    
    // Added fields based on surveySections structure
    retirementContributions: '',
    cashSurrenderValue: '',
  
    // HSA Details Section
    hasHSA: false,
    hsaContribution: '', 
    hsaBalance: '',
    
    // Annuities Section
    annuityAccounts: false, 
    annuityAmount: '', 
    annuityIncomeAtRetirement: '',
    
    // Life Insurance Section
    termLifeInsurance: true, 
    termLifeInsuranceFaceAmount: '', 
    termLifeInsuranceCoveragePeriod: '', 
    termLifeInsuranceBenefits: true,
    
    // Cash Value Life Insurance Section
    cashValueLifeInsurance: true, 
    cashValueLifeInsuranceCoverage: [{ policy: '', amount: '' }],
    policies: [{ name: '', amount: 0 }],
    
    // Long-Term Care Coverage Section
    longTermCareCoverage: false,
    ltcCoverageAmount: '',
    ltcMonthlyPremiums: '',

    monthlyIncome: '', 
    spouseMonthlyIncome: '', 
    monthlyExpenses: '', 
    temporaryExpenses: '', 
    temporaryExpenseYears: '', 
    annualTravelExpenses: '',
    lifeInsurancePremium: ''
  });
  
  
  
  const [validationErrors, setValidationErrors] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setSurveyData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleYesNoChange = (field, value) => {
    setSurveyData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const handleAddField = (field, defaultField) => {
    setSurveyData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], { ...defaultField }]
    }));
  };

  const handleDynamicFieldChange = (field, index, subField, value) => {
    setSurveyData((prevData) => {
      const updatedField = [...prevData[field]];
      if (subField) {
        updatedField[index] = { ...updatedField[index], [subField]: value }; // For nested fields
      } else {
        updatedField[index] = value; // For flat arrays (like childrenAges)
      }
      return {
        ...prevData,
        [field]: updatedField,
      };
    });
  };
  
  

  const handleNext = () => {
    const isSectionValid = validateSection();
    if (isSectionValid) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const validateSection = () => {
  const currentQuestions = surveySections[currentSection].questions;
  let errors = {};
  let hasErrors = false;

  currentQuestions.forEach((question) => {
    // Skip questions that don't meet their condition
    if (question.condition && !question.condition(surveyData)) return;

    const value = surveyData[question.field];

    // Basic validation for required fields
    if (question.validation?.required) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        errors[question.field] = question.validation.errorMessage;
        hasErrors = true;
      }

      // Handle dynamic array validation (e.g., taxableAssets)
      if (Array.isArray(value) && question.field === 'taxableAssets') {
        value.forEach((asset, index) => {
          if (!asset.description || !asset.value) {
            errors[`${question.field}[${index}]`] =
              'Each taxable asset must have a description and a value.';
            hasErrors = true;
          }
        });
      }
    }
  });

  setValidationErrors(errors);
  return !hasErrors;
};

  

  // const handleSubmit = async () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     localStorage.setItem('pendingSurvey', JSON.stringify(surveyData));
  //     navigate('/login');
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   try {
  //     const response = await axios.post(process.env.REACT_APP_API_URL+'/api/survey/submit', surveyData, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     if (response.status === 201) {
  //       console.log('Survey submitted successfully');
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       localStorage.removeItem('token');
  //       localStorage.setItem('pendingSurvey', JSON.stringify(surveyData));
  //       navigate('/login');
  //     }
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const prepareDataForSubmission = (data) => {
    const processedData = { ...data };
  
    // Filter based on boolean flags
    if (!data.hasChildren) {
      delete processedData.numberOfChildren;
      delete processedData.childrenAges;
    }
  
    if (!data.isRetired) {
      delete processedData.yearsUntilRetirement;
    }
  
    if (!data.spouseRetired) {
      delete processedData.spouseYearsUntilRetirement;
    }
  
    if (!data.saveForCollege) {
      delete processedData.collegeFeeSupportPercentage;
    }
  
    if (!data.ownHome) {
      delete processedData.homeLoanAmount;
      delete processedData.homeValue;
      delete processedData.monthlyMortgagePayment;
    }
  
    if (!data.otherRealEstate) {
      delete processedData.otherRealEstateValue;
      delete processedData.otherRealEstateLoan;
      delete processedData.otherRealEstateMortgage;
    }
  
    if (!data.studentLoans) {
      delete processedData.studentLoanBalance;
    }
  
    if (!data.otherDebts) {
      delete processedData.otherDebtsDetails;
    }
  
    if (!data.anytaxableAssets) {
      delete processedData.taxableAssets;
    }
  
    if (!data.retirementAccounts) {
      delete processedData.retirementAccountDetails;
      delete processedData.previousEmployerCurrentValue;
      delete processedData.previousEmployerAnnualContribution;
      delete processedData.previousEmployerMatchingAmount;
      delete processedData.currentEmployerCurrentValue;
      delete processedData.currentEmployerAnnualContribution;
      delete processedData.currentEmployerMatchingAmount;
      delete processedData.rothCurrentValue;
      delete processedData.rothAnnualContribution;
      delete processedData.rothMatchingAmount;
    }
  
    if (!data.hasHSA) {
      delete processedData.hsaContribution;
      delete processedData.hsaBalance;
    }
  
    if (!data.annuityAccounts) {
      delete processedData.annuityAmount;
      delete processedData.annuityIncomeAtRetirement;
    }
  
    if (!data.termLifeInsurance) {
      delete processedData.termLifeInsuranceFaceAmount;
      delete processedData.termLifeInsuranceCoveragePeriod;
      delete processedData.termLifeInsuranceBenefits;
    }
  
    if (!data.cashValueLifeInsurance) {
      delete processedData.cashValueLifeInsuranceCoverage;
    }
  
    if (!data.longTermCareCoverage) {
      delete processedData.ltcCoverageAmount;
      delete processedData.ltcMonthlyPremiums;
    }
    console.log('filtered survey:', surveyData);
    return processedData;
  };
  
  const handleSubmit = async () => {
    console.log('Unfiltered survey:', surveyData);
    prepareDataForSubmission(surveyData);
    const token = localStorage.getItem('token');
  
    if (!token) {
      // Save pending survey data and redirect to login
      localStorage.setItem('pendingSurvey', JSON.stringify(surveyData));
      navigate('/login');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const filteredData = prepareDataForSubmission(surveyData);
      console.log('Unfiltered survey:', surveyData);
      console.log('Submitting survey:', filteredData);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/survey/submit`,
        filteredData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.status === 201) {
        console.log('Survey submitted successfully');
        localStorage.removeItem('pendingSurvey');
        navigate('/user-dashboard'); // Navigate to the dashboard
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const inputRefs = useRef([]);

  const handleKeyDown = (e, currentIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
  
      // Check if the current input box is the last one in the section
      if (currentIndex < inputRefs.current.length - 1) {
        // Focus the next input box if it exists
        if (inputRefs.current[currentIndex + 1]) {
          inputRefs.current[currentIndex + 1].focus();
        }
      } else if (currentSection >= surveySections.length - 1) {
        // Submit the form if it's the last section
        handleSubmit();
      } else {
        // Trigger the "Next" button for the next section
        handleNext();
      }
    }
  };
  
  const renderQuestions = () => {
    inputRefs.current = []; // Clear refs before rendering
    return surveySections[currentSection].questions.map((question, index) => {
      if (question.condition && !question.condition(surveyData)) return null;

      return (
        <div key={question.id} className="form-group">
          {question.type !== 'checkbox' && <label className="form-label">{question.label}</label>}

          {/* Handle text input */}
        {question.type === 'nametext' && (
          <input
            ref={(el) => (inputRefs.current[index] = el)} // Store ref in the array
            onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
            type="text"
            className={`form-input ${validationErrors[question.field] ? 'input-error' : ''}`}
            value={surveyData[question.field]}
            onChange={(e) => handleChange(question.field, e.target.value)}
          />
        )}
          {question.type === 'number' && (
            <input
              ref={(el) => (inputRefs.current[index] = el)} // Store ref in the array
              onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
              type="number"
              className={`form-input ${validationErrors[question.field] ? 'input-error' : ''}`}
              value={surveyData[question.field]}
              onChange={(e) => handleChange(question.field, e.target.value)}
            />
          )}

          {question.type === 'radio' && (
            question.options.map((option) => (
              <label key={option.value} className="radio-label">
                <input
                  ref={(el) => (inputRefs.current[index] = el)} // Store ref in the array
                  onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
                  type="radio"
                  name={question.field}
                  value={option.value}
                  checked={surveyData[question.field] === option.value}
                  onChange={() => handleChange(question.field, option.value)}
                />
                {option.label}
              </label>
            ))
          )}

          {question.type === 'yesno' && (
            <div className="yesno-group">
              <button
                className={`yesno-button ${surveyData[question.field] === true ? 'yes-selected' : ''}`}
                onClick={() => handleYesNoChange(question.field, true)}
              >
                Yes
              </button>
              <button
                className={`yesno-button ${surveyData[question.field] === false ? 'no-selected' : ''}`}
                onClick={() => handleYesNoChange(question.field, false)}
              >
                No
              </button>
            </div>
          )}
          {question.type === 'checkbox' && question.options && (
          <div className="checkbox-group">
            <label className="form-label">{question.label}</label>
            {question.options.map((option) => (
              <label key={option.value} className="checkbox-label">
                <input
                  ref={(el) => (inputRefs.current[index] = el)} // Store ref in the array
                  onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
                  type="checkbox"
                  value={option.value}
                  checked={surveyData[question.field]?.includes(option.value)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSurveyData((prevData) => {
                      const selectedOptions = prevData[question.field] || [];
                      const updatedOptions = checked
                        ? [...selectedOptions, option.value]
                        : selectedOptions.filter((value) => value !== option.value);
                      return { ...prevData, [question.field]: updatedOptions };
                    });
                  }}
                />
                {option.label}
              </label>
            ))}
          </div>
        )}

          {question.type === 'dynamicChildrenAges' && (
  <div>
    {Array.from({ length: surveyData.numberOfChildren }, (_, index) => (
      <div key={index} className="form-group">
        <label className="form-label">{`Child ${index + 1}'s age`}</label>
        <input
          ref={(el) => (inputRefs.current[index] = el)} // Store ref in the array
          onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
          type="number"
          className={`form-input ${validationErrors[`childrenAges${index}`] ? 'input-error' : ''}`}
          value={surveyData.childrenAges[index] || ''} // Direct access to number value
          onChange={(e) => handleDynamicFieldChange('childrenAges', index, null, e.target.value)}
        />
      </div>
    ))}
  </div>
)}


          {question.type === 'dynamicDebtFields' && (
            <div>
              {surveyData.otherDebtsDetails.map((debt, index) => (
                <div key={index} className="form-group">
                  <input
                    ref={(el) => (inputRefs.current[index] = el)} // Store ref in the array
                    onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
                    type="text"
                    placeholder={`Debt ${index + 1} Description`}
                    className="form-input"
                    value={debt.description}
                    onChange={(e) => handleDynamicFieldChange('otherDebtsDetails', index, 'description', e.target.value)}
                  />
                  <input
                    ref={(el) => (inputRefs.current[index] = el)} // Store ref in the array
                    onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
                    type="number"
                    placeholder={`Debt ${index + 1} Amount`}
                    className="form-input"
                    value={debt.amount}
                    onChange={(e) => handleDynamicFieldChange('otherDebtsDetails', index, 'amount', e.target.value)}
                  />
                </div>
              ))}
              <button className="add-button" onClick={() => handleAddField('otherDebtsDetails', { description: '', amount: '' })}>Add More Debts</button>
            </div>
          )}
          {question.type === 'dynamicPolicyFields' && (
  <div>
    {surveyData.policies.map((policy, index) => (
      <div key={index} className="form-group policy-group">
        <input
          ref={(el) => (inputRefs.current[index] = el)} // Store ref in the array
          onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
          type="text"
          placeholder={`Policy ${index + 1} Name`}
          className="form-input policy-name"
          value={policy.name}
          onChange={(e) => handleDynamicFieldChange('policies', index, 'name', e.target.value)}
        />
        <input
          ref={(el) => (inputRefs.current[index] = el)} // Store ref in the array
          onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
          type="number"
          placeholder={`Policy ${index + 1} Amount`}
          className="form-input policy-amount"
          value={policy.amount}
          onChange={(e) => handleDynamicFieldChange('policies', index, 'amount', e.target.value)}
        />
      </div>
    ))}
    <button className="add-button" onClick={() => handleAddField('policies', { name: '', amount: '' })}>
      Add More Policies
    </button>
  </div>
)}

{question.type === 'dynamicAssetFields' && (
  <div>
    {surveyData.taxableAssets.map((asset, index) => (
      <div key={index} className="form-group asset-group">
        <input
          ref={(el) => (inputRefs.current[index] = el)} // Store ref in the array
          onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
          type="text"
          placeholder={`Asset ${index + 1} Description`}
          className={`form-input ${
            validationErrors[`taxableAssets[${index}]`] ? 'input-error' : ''
          }`}
          value={asset.description}
          onChange={(e) =>
            handleDynamicFieldChange('taxableAssets', index, 'description', e.target.value)
          }
        />
        {validationErrors[`taxableAssets[${index}]`] &&
          validationErrors[`taxableAssets[${index}]`].includes('description') && (
            <div className="error-message">
              {validationErrors[`taxableAssets[${index}]`]}
            </div>
          )}

        <input
          ref={(el) => (inputRefs.current[index] = el)} // Store ref in the array
          onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key
          type="number"
          placeholder={`Asset ${index + 1} Value`}
          className={`form-input ${
            validationErrors[`taxableAssets[${index}]`] ? 'input-error' : ''
          }`}
          value={asset.value}
          onChange={(e) =>
            handleDynamicFieldChange('taxableAssets', index, 'value', e.target.value)
          }
        />
        {validationErrors[`taxableAssets[${index}]`] &&
          validationErrors[`taxableAssets[${index}]`].includes('value') && (
            <div className="error-message">
              {validationErrors[`taxableAssets[${index}]`]}
            </div>
          )}
      </div>
    ))}
    <button
      className="add-button"
      onClick={() => handleAddField('taxableAssets', { description: '', value: '' })}
    >
      Add More Assets
    </button>
  </div>
)}



          {validationErrors[question.field] && (
            <div className="error-message">{validationErrors[question.field]}</div>
          )}
        </div>
      );
    });
  };
  useEffect(() => {
    // Focus the first input box when a new section renders, if available
    if (inputRefs.current.length > 0 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [currentSection]);
  useEffect(() => {
    // Focus the first input box when a new section renders, if available
    if (inputRefs.current.length > 0 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  
    // Load existing survey data from local storage
    const storedSurveyData = localStorage.getItem('pendingSurvey');
    if (storedSurveyData) {
      setSurveyData(JSON.parse(storedSurveyData));
    }
  }, [currentSection]);
  useEffect(() => {
    localStorage.setItem('pendingSurvey', JSON.stringify(surveyData));
  }, [surveyData]);
    
  return (
    <div className="survey-container" >
        <div className="flex-1 flex flex-col items-center px-5 py-5">
          <div className="max-w-xl w-full">
            {renderQuestions()}
            <div className="flex justify-between mt-5">
              {currentSection > 0 && (
                <button onClick={handleBack} className="button back-button">
                  Back
                </button>
              )}
              {currentSection >= surveySections.length - 1 ? (
                <button 
                  onClick={handleSubmit} 
                  className="button submit-button" 
                  disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              ) : (
                <button onClick={handleNext} className="button next-button">
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default MainSurvey;