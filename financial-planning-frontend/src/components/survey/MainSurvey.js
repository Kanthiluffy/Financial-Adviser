import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MainSurvey.css'; // Import your CSS file

const surveyQuestions = [
  { id: 1, type: 'number', label: 'What is your age?', field: 'age', validation: { required: true, errorMessage: 'Age is required.' } },
  { id: 2, type: 'radio', label: 'What is your marital status?', field: 'maritalStatus', options: [{ value: 'single', label: 'Single' }, { value: 'married', label: 'Married' }], validation: { required: true, errorMessage: 'Please select your marital status.' } },
  { id: 3, type: 'number', label: "What is your spouse/partner's age?", field: 'spouseAge', condition: (data) => data.maritalStatus === 'married', validation: { required: true, errorMessage: 'Spouse age is required when married.' } },
  { id: 4, type: 'checkbox', label: 'Do you have children?', field: 'hasChildren' },
  { id: 5, type: 'number', label: 'How many children do you have?', field: 'numberOfChildren', condition: (data) => data.hasChildren, validation: { required: true, errorMessage: 'Number of children is required if you have children.' } },
  
  // Dynamic Children Age Fields
  { id: 6, type: 'dynamicChildrenAges', label: 'Please provide the ages of your children', field: 'childrenAges', condition: (data) => data.hasChildren && data.numberOfChildren > 0, validation: { required: true, errorMessage: 'Please provide the ages of your children.' } },
  
  { id: 7, type: 'checkbox', label: 'I am already retired', field: 'isRetired' },
  { id: 8, type: 'number', label: 'How many more years do you plan to work?', field: 'yearsUntilRetirement', condition: (data) => !data.isRetired, validation: { required: true, errorMessage: 'Please specify the number of years until retirement.' } },
  { id: 9, type: 'checkbox', label: 'My spouse/partner is already retired', field: 'spouseRetired', condition: (data) => data.maritalStatus === 'married' },
  { id: 10, type: 'number', label: 'How many more years does your spouse/partner plan to work?', field: 'spouseYearsUntilRetirement', condition: (data) => !data.spouseRetired && data.maritalStatus === 'married', validation: { required: true, errorMessage: 'Please specify the number of years your spouse plans to work.' } },
  
  { id: 11, type: 'checkbox', label: 'I own my primary home', field: 'ownHome' },
  { id: 12, type: 'number', label: 'What is the loan amount on your primary home?', field: 'homeLoanAmount', condition: (data) => data.ownHome, validation: { required: true, errorMessage: 'Please provide the loan amount on your primary home.' } },
  { id: 13, type: 'number', label: 'What is the current value of your home?', field: 'homeValue', condition: (data) => data.ownHome, validation: { required: true, errorMessage: 'Please provide the current value of your home.' } },
  
  { id: 14, type: 'number', label: 'What is your current monthly income?', field: 'monthlyIncome', validation: { required: true, errorMessage: 'Monthly income is required.' } },
  { id: 15, type: 'number', label: 'What are your current monthly expenses (excluding mortgage payments)?', field: 'monthlyExpenses', validation: { required: true, errorMessage: 'Monthly expenses are required.' } },
  
  { id: 16, type: 'text', label: 'Please specify the temporary expenses.', field: 'temporaryExpensesDetails', condition: (data) => data.temporaryExpenses, validation: { required: true, errorMessage: 'Please specify the temporary expenses.' } },
  { id: 17, type: 'number', label: 'How many years will the temporary expenses last?', field: 'temporaryExpensesYears', condition: (data) => data.temporaryExpenses, validation: { required: true, errorMessage: 'Please provide the number of years the expenses will last.' } },

  { id: 18, type: 'checkbox', label: 'I have term life insurance coverage', field: 'termLifeInsurance' },

  { id: 19, type: 'number', label: 'What is the face amount of your term life insurance?', field: 'termLifeInsuranceFaceAmount', condition: (data) => data.termLifeInsurance, validation: { required: true, errorMessage: 'Please provide the face amount of your term life insurance.' } },
  { id: 20, type: 'number', label: 'What is the coverage period of your term life insurance?', field: 'termLifeInsuranceCoveragePeriod', condition: (data) => data.termLifeInsurance, validation: { required: true, errorMessage: 'Please provide the coverage period of your term life insurance.' } },
];

const MainSurvey = () => {
  const [surveyData, setSurveyData] = useState({
    age: '', maritalStatus: '', spouseAge: '', hasChildren: false, numberOfChildren: '', childrenAges: [],
    isRetired: false, yearsUntilRetirement: 0, spouseRetired: false, spouseYearsUntilRetirement: 0,
    ownHome: false, homeLoanAmount: '', homeValue: '', monthlyIncome: '', monthlyExpenses: '',
    temporaryExpenses: false, temporaryExpensesDetails: '', temporaryExpensesYears: '',
    termLifeInsurance: false, termLifeInsuranceFaceAmount: '', termLifeInsuranceCoveragePeriod: ''
  });
  const [currentPage, setCurrentPage] = useState(0); // Track the current page index
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const questionsPerPage = 3; // Display 1 to 3 questions per page

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setSurveyData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Update to handle dynamic child ages input as an array of numbers
  const handleChildrenAgeChange = (index, value) => {
    const updatedAges = [...surveyData.childrenAges];
    updatedAges[index] = parseInt(value, 10); // Ensure the value is a number
    setSurveyData((prevData) => ({
      ...prevData,
      childrenAges: updatedAges,
    }));
  };

  const validatePage = () => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    const currentQuestions = surveyQuestions.slice(start, end);

    let errors = {};
    let hasErrors = false;

    currentQuestions.forEach((question) => {
      if (question.condition && !question.condition(surveyData)) return;
      const value = surveyData[question.field];
      if (question.validation?.required && !value) {
        errors[question.field] = question.validation.errorMessage;
        hasErrors = true;
      }
    });

    setValidationErrors(errors);
    setIsFormValid(!hasErrors);
    return !hasErrors;
  };

  const handleNext = () => {
    if (validatePage()) {
      setCurrentPage(currentPage + 1); // Move to the next page
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1); // Move to the previous page
    }
  };

  const handleSubmit = async () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    console.log("Token:", token); // Debug log to check the token
  
    // If token does not exist, redirect to the login page
    if (!token) {
      console.error('No token found, redirecting to login.'); // Log error
      localStorage.setItem('pendingSurvey', JSON.stringify(surveyData)); // Save survey data for later
      navigate('/login'); // Redirect to login page
      return; // Exit the function early
    }
  
    // Attempt to submit the survey data
    try {
      const response = await axios.post('http://localhost:5000/api/survey/submit', surveyData, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
  
      // Check if the submission was successful
      if (response.status === 201) {
        console.log('Survey submitted successfully'); // Log success message
        // Optionally reset form or navigate to a success page
      }
    } catch (error) {
      console.error('Error submitting survey:', error); // Log error
      // Check if the error is due to authorization
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.'); // Log unauthorized error
        localStorage.removeItem('token'); // Optionally clear the token if it's invalid
        localStorage.setItem('pendingSurvey', JSON.stringify(surveyData)); // Save survey data for later
        navigate('/login'); // Redirect to login page
      }
    }
  };
  
  // Render the questions for the current page
  const renderQuestions = () => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    return surveyQuestions.slice(start, end).map((question) => {
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

          {question.type === 'checkbox' && (
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={surveyData[question.field]}
                onChange={(e) => handleChange(question.field, e.target.checked)}
              />
              {question.label}
            </label>
          )}

          {question.type === 'dynamicChildrenAges' && (
            <div>
              {Array.from({ length: surveyData.numberOfChildren }, (_, index) => (
                <div key={index} className="form-group">
                  <label className="form-label">{`Child ${index + 1}'s age`}</label>
                  <input
                    type="number"
                    className={`form-input ${validationErrors[`childrenAges${index}`] ? 'input-error' : ''}`}
                    value={surveyData.childrenAges[index] || ''}
                    onChange={(e) => handleChildrenAgeChange(index, e.target.value)}
                  />
                  {validationErrors[`childrenAges${index}`] && (
                    <div className="error-message">
                      {validationErrors[`childrenAges${index}`]}
                    </div>
                  )}
                </div>
              ))}
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
            {currentPage > 0 && (
              <button onClick={handleBack} className="button back-button">
                Back
              </button>
            )}
            {currentPage * questionsPerPage + questionsPerPage >= surveyQuestions.length ? (
              <button onClick={handleSubmit} className="button submit-button" disabled={!isFormValid}>
                Submit
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
