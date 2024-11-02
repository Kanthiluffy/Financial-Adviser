import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDashboard.css';

const UserDashboard = () => {
  const [surveyData, setSurveyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurveyData();
  }, []);

  const fetchSurveyData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/survey/status', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSurveyData(response.data.survey);
    } catch (err) {
      setError('Failed to fetch survey data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = () => {
    if (!surveyData) return 0;
    let score = 0;

    // Basic financial health indicators
    if (surveyData.emergencySavings > 10000) score += 20;
    if (surveyData.retirementAccounts) score += 20;
    if (surveyData.ownHome) score += 20;
    if (!surveyData.studentLoans) score += 20;
    if (surveyData.termLifeInsurance || surveyData.cashValueLifeInsurance) score += 20;

    return score;
  };

  const getMissingInfo = () => {
    if (!surveyData) return [];
    const missing = [];

    if (!surveyData.emergencySavings) missing.push('Emergency Savings Information');
    if (!surveyData.retirementAccounts) missing.push('Retirement Account Details');
    if (!surveyData.termLifeInsurance && !surveyData.cashValueLifeInsurance) {
      missing.push('Life Insurance Information');
    }

    return missing;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const score = calculateScore();
  const missingInfo = getMissingInfo();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Financial Dashboard</h1>
        <div className="header-actions">
          <button className="profile-btn">Profile</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="score-section">
          <h2>Financial Health Score</h2>
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-label">out of 100</span>
          </div>
        </div>

        {surveyData && (
          <div className="survey-summary">
            <h2>Survey Summary</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <label>Age:</label>
                <span>{surveyData.age}</span>
              </div>
              <div className="summary-item">
                <label>Marital Status:</label>
                <span>{surveyData.maritalStatus}</span>
              </div>
              <div className="summary-item">
                <label>Home Owner:</label>
                <span>{surveyData.ownHome ? 'Yes' : 'No'}</span>
              </div>
              <div className="summary-item">
                <label>Retirement Accounts:</label>
                <span>{surveyData.retirementAccounts ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        )}

        {missingInfo.length > 0 && (
          <div className="missing-info">
            <h2>Missing Information</h2>
            <ul>
              {missingInfo.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="update-btn" onClick={() => navigate('/survey')}>
              Update Information
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;