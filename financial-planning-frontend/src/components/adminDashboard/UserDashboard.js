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
      const response = await axios.get(process.env.url+'/api/survey/status', {
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
    let maxScore = 100;
    let factors = 0;

    // Emergency Savings (20 points)
    if (surveyData.emergencySavings) {
      factors++;
      const monthlyExpenses = 5000; // Example monthly expenses
      const savingsRatio = surveyData.emergencySavings / (monthlyExpenses * 6);
      score += Math.min(20, Math.round(savingsRatio * 20));
    }

    // Retirement Planning (20 points)
    if (surveyData.retirementAccounts) {
      factors++;
      score += 20;
    }

    // Home Ownership (20 points)
    if (surveyData.ownHome) {
      factors++;
      const equityRatio = (surveyData.homeValue - surveyData.homeLoanAmount) / surveyData.homeValue;
      score += Math.min(20, Math.round(equityRatio * 20));
    }

    // Debt Management (20 points)
    if (!surveyData.studentLoans && !surveyData.otherDebts) {
      factors++;
      score += 20;
    }

    // Insurance Coverage (20 points)
    if (surveyData.termLifeInsurance || surveyData.cashValueLifeInsurance) {
      factors++;
      score += 20;
    }

    // Adjust max score based on applicable factors
    maxScore = factors * 20;
    return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  };

  const getMissingInfo = () => {
    if (!surveyData) return [];
    const missing = [];

    if (!surveyData.emergencySavings) missing.push('Emergency Savings Information');
    if (!surveyData.retirementAccounts) missing.push('Retirement Account Details');
    if (!surveyData.termLifeInsurance && !surveyData.cashValueLifeInsurance) {
      missing.push('Life Insurance Information');
    }
    if (!surveyData.taxableAssets) missing.push('Investment Portfolio Details');
    if (surveyData.maritalStatus === 'married' && !surveyData.spouseAge) {
      missing.push('Spouse Information');
    }

    return missing;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEditSurvey = () => {
    navigate('/survey');
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
        <div className="score-card">
          <h2>Financial Health Score</h2>
          <div className="score-circle" style={{ '--score': `${score}%` }}>
            <div className="score-value">{score}</div>
            <div className="score-label">Score</div>
          </div>
          <div className="score-description">
            {score >= 80 ? 'Excellent financial health!' :
             score >= 60 ? 'Good financial standing' :
             score >= 40 ? 'Room for improvement' :
             'Action needed'}
          </div>
        </div>

        {surveyData && (
          <div className="summary-card">
            <div className="card-header">
              <h2>Financial Summary</h2>
              <button className="edit-btn" onClick={handleEditSurvey}>Edit</button>
            </div>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Age</span>
                <span className="value">{surveyData.age}</span>
              </div>
              <div className="summary-item">
                <span className="label">Marital Status</span>
                <span className="value">{surveyData.maritalStatus}</span>
              </div>
              <div className="summary-item">
                <span className="label">Emergency Savings</span>
                <span className="value">${surveyData.emergencySavings || 0}</span>
              </div>
              <div className="summary-item">
                <span className="label">Retirement Accounts</span>
                <span className="value">{surveyData.retirementAccounts ? 'Yes' : 'No'}</span>
              </div>
              {surveyData.ownHome && (
                <div className="summary-item">
                  <span className="label">Home Equity</span>
                  <span className="value">
                    ${(surveyData.homeValue - surveyData.homeLoanAmount) || 0}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {missingInfo.length > 0 && (
          <div className="missing-card">
            <h2>Missing Information</h2>
            <div className="missing-list">
              {missingInfo.map((item, index) => (
                <div key={index} className="missing-item">
                  <i className="bi bi-exclamation-circle"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button className="update-btn" onClick={handleEditSurvey}>
              Complete Your Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;