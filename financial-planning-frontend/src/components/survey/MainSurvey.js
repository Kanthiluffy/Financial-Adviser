import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MainSurvey.css';
const surveySections = [
  {
    title: "Demographics Section",
    questions: [
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
    title: "Retirement and HSA Details",
    questions: [
      { id: 33, type: 'yesno', label: 'Do you have retirement accounts?', field: 'retirementAccounts' },
      { id: 34, type: 'checkbox', label: 'Please specify your retirement accounts:', field: 'retirementAccountDetails', options: [{ value: 'previousEmployer', label: 'Previous employer 401(k), IRA, SEP IRA (Pre-tax)' }, { value: 'currentEmployer', label: 'Current employer 401(k)' }, { value: 'roth', label: 'Roth 401(k), Roth IRA (Post-tax)' }], condition: (data) => data.retirementAccounts === true },
      { id: 35, type: 'number', label: 'Annual contributions and matching (if applicable):', field: 'retirementContributions', condition: (data) => data.retirementAccounts === true },
    ],
  },
  {
    title: "Life Insurance Section",
    questions: [
      { id: 36, type: 'yesno', label: 'Do you have term life insurance coverage?', field: 'termLifeInsurance' },
      { id: 37, type: 'number', label: 'Face amount of your term life insurance?', field: 'termLifeInsuranceFaceAmount', condition: (data) => data.termLifeInsurance === true, validation: { required: true, errorMessage: 'Provide face amount of term life insurance.' } },
      { id: 38, type: 'number', label: 'Coverage period of your term life insurance?', field: 'termLifeInsuranceCoveragePeriod', condition: (data) => data.termLifeInsurance === true, validation: { required: true, errorMessage: 'Provide coverage period of term life insurance.' } },
      { id: 39, type: 'yesno', label: 'Does your term life insurance include living benefits?', field: 'termLifeInsuranceBenefits', condition: (data) => data.termLifeInsurance === true }
    ]
  },
  {
    title: "Cash Value Life Insurance Section",
    questions: [
      { id: 40, type: 'yesno', label: 'Do you have cash value life insurance (e.g., whole life, universal life, variable life)?', field: 'cashValueLifeInsurance' },
      { 
        id: 41, 
        type: 'dynamicPolicyFields', 
        label: 'What is the coverage amount for each policy?', 
        field: 'cashValueLifeInsuranceCoverage', 
        condition: (data) => data.cashValueLifeInsurance === true, 
        validation: { required: true, errorMessage: 'Please provide details of each life insurance policy.' }
      }
    ]
  }
];

const MainSurvey = () => {
  const [surveyData, setSurveyData] = useState({
    age: '', 
    maritalStatus: '', 
    spouseAge: '', 
    hasChildren: true, 
    numberOfChildren: '', 
    childrenAges: [],
    isRetired: true, 
    yearsUntilRetirement: 0, 
    spouseRetired: true, 
    spouseYearsUntilRetirement: 0,
    ownHome: true, 
    homeLoanAmount: '', 
    homeValue: '', 
    monthlyMortgagePayment: '',
    otherRealEstate: false, 
    otherRealEstateValue: '', 
    otherRealEstateLoan: '', 
    otherRealEstateMortgage: '',
    studentLoans: false, 
    studentLoanBalance: '', 
    otherDebts: false, 
    otherDebtsDetails: [{ description: '', amount: '' }],
    anytaxableAssets: false,
    taxableAssets: [{ description: '', value: '' }], 
    emergencySavings: '',
    retirementAccounts: true, 
    retirementAccountDetails: [], // Initialize as empty array
    retirementContributions: '',
    termLifeInsurance: true, 
    termLifeInsuranceFaceAmount: '', 
    termLifeInsuranceCoveragePeriod: '', 
    termLifeInsuranceBenefits: true,
    cashValueLifeInsurance: true, 
    cashValueLifeInsuranceCoverage: [{ policy: '', amount: '' }],
    policies: [{ name: '', amount: 0 }] // Initialize with a default object
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
      if (question.condition && !question.condition(surveyData)) return;
      const value = surveyData[question.field];
      if (question.validation?.required && (!value || (Array.isArray(value) && value.length === 0))) {
        errors[question.field] = question.validation.errorMessage;
        hasErrors = true;
      }
    });

    setValidationErrors(errors);
    return !hasErrors;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('pendingSurvey', JSON.stringify(surveyData));
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/survey/submit', surveyData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 201) {
        console.log('Survey submitted successfully');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.setItem('pendingSurvey', JSON.stringify(surveyData));
        navigate('/login');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestions = () => {
    return surveySections[currentSection].questions.map((question) => {
      if (question.condition && !question.condition(surveyData)) return null;

      return (
        <div key={question.id} className="form-group">
          {question.type !== 'checkbox' && <label className="form-label">{question.label}</label>}

          {question.type === 'number' && (
            <input
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

          {question.type === 'dynamicChildrenAges' && (
  <div>
    {Array.from({ length: surveyData.numberOfChildren }, (_, index) => (
      <div key={index} className="form-group">
        <label className="form-label">{`Child ${index + 1}'s age`}</label>
        <input
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
                    type="text"
                    placeholder={`Debt ${index + 1} Description`}
                    className="form-input"
                    value={debt.description}
                    onChange={(e) => handleDynamicFieldChange('otherDebtsDetails', index, 'description', e.target.value)}
                  />
                  <input
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
          type="text"
          placeholder={`Policy ${index + 1} Name`}
          className="form-input policy-name"
          value={policy.name}
          onChange={(e) => handleDynamicFieldChange('policies', index, 'name', e.target.value)}
        />
        <input
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
          type="text"
          placeholder={`Asset ${index + 1} Description`}
          className="form-input asset-description"
          value={asset.description}
          onChange={(e) => handleDynamicFieldChange('taxableAssets', index, 'description', e.target.value)}
        />
        <input
          type="number"
          placeholder={`Asset ${index + 1} Value`}
          className="form-input asset-value"
          value={asset.value}
          onChange={(e) => handleDynamicFieldChange('taxableAssets', index, 'value', e.target.value)}
        />
      </div>
    ))}
    <button className="add-button" onClick={() => handleAddField('taxableAssets', { description: '', value: '' })}>
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

  return (
    <div className="survey-container">
      
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