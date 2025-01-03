const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const Survey = require('../models/survey');
const router = express.Router();


// Fetch existing survey data for the logged-in user
router.get('/edit', authMiddleware, async (req, res) => {
  try {
    const survey = await Survey.findOne({ user: req.user.id });

    if (!survey) {
      return res.status(404).json({ message: 'Survey not found for this user' });
    }

    res.status(200).json(survey);
  } catch (error) {
    console.error('Error fetching survey:', error);
    res.status(500).json({ message: 'Error fetching survey data', error });
  }
});

// Update survey data
router.put('/edit', authMiddleware, async (req, res) => {
  try {
    const updatedSurvey = await Survey.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body }, // Assuming the frontend sends all updated fields in req.body
      { new: true, runValidators: true }
    );

    if (!updatedSurvey) {
      return res.status(404).json({ message: 'Survey not found for this user' });
    }

    res.status(200).json({ message: 'Survey updated successfully', survey: updatedSurvey });
  } catch (error) {
    console.error('Error updating survey:', error);
    res.status(500).json({ message: 'Error updating survey data', error });
  }
});




// Submit survey data
router.post('/submit', authMiddleware, async (req, res) => {
  const {
    name,
    age,
    maritalStatus,
    spouseAge,
    hasChildren,
    childrenAges,
    isRetired,
    yearsUntilRetirement,
    isSpouseRetired,
    spouseYearsUntilRetirement,
    saveForCollege,
    collegeFeeSupportPercentage,
    ownPrimaryHome,
    loanAmountPrimaryHome,
    currentHomeValue,
    monthlyMortgagePayment,
    ownOtherRealEstate,
    otherRealEstateValue,
    otherRealEstateLoanAmount,
    otherRealEstateMortgagePayment,
    studentLoans,
    studentLoanBalance,
    otherDebts,
    otherDebtDetails, // Assuming this is now an array of objects with fields 'description' and 'amount'
    monthlyIncome,
    monthlyExpenses,
    temporaryExpenses,
    temporaryExpenseDetails,
    annualTravelExpenses,
    anytaxableAssets,
    taxableAssets, // Assuming this is an array of objects with fields 'description' and 'value'
    emergencySavings,
    retirementAccounts,
    retirementAccountTypes, // Assuming this is an array of strings
    previousEmployerCurrentValue,
    previousEmployerAnnualContribution,
    previousEmployerMatchingAmount,
    currentEmployerCurrentValue,
    currentEmployerAnnualContribution,
    currentEmployerMatchingAmount,
    rothCurrentValue,
    rothAnnualContribution,
    rothMatchingAmount,
    retirementAnnualContributions,
    HSA_balance,
    HSA_annualContributions,
    termLifeInsurance,
    termLifeInsuranceAmount,
    termLifeInsurancePeriod,
    termLifeInsuranceLivingBenefits,
    cashValueLifeInsurance,
    cashValueLifeInsuranceAmount,
    cashSurrenderValue,
    hasHSA,
    hsaContribution,
    hsaBalance,
    annuityAccounts,
    annuityAmount,
    annuityIncomeAtRetirement,
    longTermCareCoverage,
    ltcCoverageAmount,
    ltcMonthlyPremiums,
    spouseMonthlyIncome,
    temporaryExpenseYears,
    lifeInsurancePremium,
  } = req.body;

  try {
    const survey = new Survey({
      user: req.user.id,
      name,
      age,
      maritalStatus,
      spouseAge,
      hasChildren,
      childrenAges,
      isRetired,
      yearsUntilRetirement,
      isSpouseRetired,
      spouseYearsUntilRetirement,
      saveForCollege,
      collegeFeeSupportPercentage,
      ownPrimaryHome,
      loanAmountPrimaryHome,
      currentHomeValue,
      monthlyMortgagePayment,
      ownOtherRealEstate,
      otherRealEstateValue,
      otherRealEstateLoanAmount,
      otherRealEstateMortgagePayment,
      studentLoans,
      studentLoanBalance,
      otherDebts,
      otherDebtDetails, // Expected as an array of objects with 'description' and 'amount'
      monthlyIncome,
      monthlyExpenses,
      temporaryExpenses,
      temporaryExpenseDetails,
      annualTravelExpenses,
      anytaxableAssets,
      taxableAssets, // Expected as an array of objects with 'description' and 'value'
      emergencySavings,
      retirementAccounts,
      retirementAccountTypes, // Expected as an array of strings
      previousEmployerCurrentValue,
      previousEmployerAnnualContribution,
      previousEmployerMatchingAmount,
      currentEmployerCurrentValue,
      currentEmployerAnnualContribution,
      currentEmployerMatchingAmount,
      rothCurrentValue,
      rothAnnualContribution,
      rothMatchingAmount,
      retirementAnnualContributions,
      HSA_balance,
      HSA_annualContributions,
      termLifeInsurance,
      termLifeInsuranceAmount,
      termLifeInsurancePeriod,
      termLifeInsuranceLivingBenefits,
      cashValueLifeInsurance,
      cashValueLifeInsuranceAmount,
      cashSurrenderValue,
      hasHSA,
      hsaContribution,
      hsaBalance,
      annuityAccounts,
      annuityAmount,
      annuityIncomeAtRetirement,
      longTermCareCoverage,
      ltcCoverageAmount,
      ltcMonthlyPremiums,
      spouseMonthlyIncome,
      temporaryExpenseYears,
      lifeInsurancePremium
    });

    await survey.save();
    res.status(201).json({ message: 'Survey submitted successfully', survey });
  } catch (error) {
    console.error('Error submitting survey:', error);
    res.status(500).json({ message: 'Error submitting survey data', error });
  }
});

module.exports = router;




// Endpoint to check if the user has completed the survey
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID from the token

    // Find the user's survey
    const survey = await Survey.findOne({ user: userId });

    if (survey) {
      // User has completed the survey
      return res.json({ completed: true, survey });
    } else {
      // User hasn't completed the survey
      return res.json({ completed: false });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error checking survey status' });
  }
});

module.exports = router;



// Get summary and advice based on survey data
router.get('/summary', authMiddleware, async (req, res) => {
    try {
      const survey = await Survey.findOne({ user: req.user.id });
  
      if (!survey) {
        return res.status(404).json({ message: 'Survey not found for user' });
      }
  
      // Example simple advice generation logic based on user's inputs
      const advice = generateFinancialAdvice(survey);
  
      res.status(200).json({ survey, summary: advice });
    } catch (error) {
      res.status(500).json({ message: 'Error generating summary', error });
    }
  });
  
  // Function to generate basic financial advice based on survey data
  const generateFinancialAdvice = (survey) => {
    const advice = {};
  
    // Example: If the user's retirement goal is far from current age, suggest saving more
    if (survey.retirementAge - survey.age > 20) {
      advice.savings = `Based on your current age (${survey.age}) and retirement goal (${survey.retirementAge}), we recommend you focus on maximizing contributions to retirement accounts.`;
    } else {
      advice.savings = `Since you are closer to your retirement age (${survey.retirementAge}), it's a good idea to evaluate your investment strategies and ensure you're on track.`;
    }
  
    // Example: Based on risk tolerance
    if (survey.riskTolerance === 'low') {
      advice.investments = 'With a low risk tolerance, consider conservative investments like bonds or index funds.';
    } else if (survey.riskTolerance === 'medium') {
      advice.investments = 'With a medium risk tolerance, a balanced portfolio of stocks and bonds may be appropriate.';
    } else {
      advice.investments = 'With a high risk tolerance, you might focus on aggressive growth investments, such as stocks or ETFs.';
    }
  
    // Customize further advice based on other fields like spouseAge, kids, etc.
    return advice;
  };
  


  module.exports = router;
