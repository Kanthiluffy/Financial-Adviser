import React, { useState } from 'react';
import { Header } from './components/Header';
import { RetirementScore } from './components/RetirementScore';
import { SurveySummary } from './components/SurveySummary';
import { MissingInfo } from './components/MissingInfo';
import { FullSummary } from './components/FullSummary';
import { EditSurvey } from './components/EditSurvey';

function UserDashboard() {
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [showEditSurvey, setShowEditSurvey] = useState(false);
  const [surveyData, setSurveyData] = useState({
    age: 35,
    maritalStatus: 'married',
    spouseAge: 33,
    hasChildren: true,
    numberOfChildren: 2,
    childrenAges: [5, 3],
    isRetired: false,
    yearsUntilRetirement: 25,
    ownHome: true,
    homeValue: 450000,
    homeLoanAmount: 350000,
    emergencySavings: 25000,
    retirementAccounts: true,
    retirementContributions: 15000,
  });

  const calculateRetirementScore = () => {
    let score = 0;
    const targetEmergencySavings = surveyData.age < 30 ? 10000 : 20000;
    
    if (surveyData.emergencySavings >= targetEmergencySavings) score += 25;
    else score += (surveyData.emergencySavings / targetEmergencySavings) * 25;
    
    if (surveyData.retirementAccounts) score += 25;
    if (surveyData.retirementContributions > 10000) score += 25;
    
    if (surveyData.ownHome) {
      const equity = surveyData.homeValue - surveyData.homeLoanAmount;
      if (equity > 100000) score += 25;
      else score += (equity / 100000) * 25;
    }
    
    return Math.min(Math.round(score), 100);
  };

  const getMissingInfo = () => {
    const missing = [];
    if (!surveyData.retirementAccounts) missing.push('Retirement account information');
    if (!surveyData.emergencySavings) missing.push('Emergency savings details');
    if (surveyData.retirementContributions < 5000) missing.push('Adequate retirement contributions');
    return missing;
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleSaveSurvey = (newData) => {
    setSurveyData(newData);
    setShowEditSurvey(false);
  };

  const score = calculateRetirementScore();
  const missingInfo = getMissingInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RetirementScore score={score} />
          <SurveySummary 
            surveyData={surveyData}
            onEdit={() => setShowEditSurvey(true)}
            onViewFull={() => setShowFullSummary(true)}
          />
          <MissingInfo 
            missingInfo={missingInfo}
            onUpdate={() => setShowEditSurvey(true)}
          />
        </div>
      </main>

      {showFullSummary && (
        <FullSummary 
          surveyData={surveyData}
          onClose={() => setShowFullSummary(false)}
        />
      )}

      {showEditSurvey && (
        <EditSurvey
          surveyData={surveyData}
          onSave={handleSaveSurvey}
          onClose={() => setShowEditSurvey(false)}
        />
      )}
    </div>
  );
}

export default UserDashboard;