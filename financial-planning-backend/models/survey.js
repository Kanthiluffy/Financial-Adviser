const mongoose = require('mongoose');

const otherDebtDetailsSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true }
});

const taxableAssetSchema = new mongoose.Schema({
  description: { type: String, required: true },
  value: { type: Number, required: true }
});

const cashValueLifeInsuranceCoverageSchema = new mongoose.Schema({
  policy: { type: String, required: true },
  amount: { type: Number, required: true }
});

const surveySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Demographics Section
  name: { type: String, required: true },
  age: { type: Number, required: true },
  maritalStatus: { type: String, enum: ['single', 'married'], required: true },
  spouseAge: { type: Number },
  hasChildren: { type: Boolean, required: true },
  numberOfChildren: { type: Number },
  childrenAges: [{ type: Number }],

  // Goals Section
  isRetired: { type: Boolean, required: true },
  yearsUntilRetirement: { type: Number },
  spouseRetired: { type: Boolean },
  spouseYearsUntilRetirement: { type: Number },
  saveForCollege: { type: Boolean },  
  collegeFeeSupportPercentage: { type: Number },  

  // Assets and Liabilities Section
  ownHome: { type: Boolean },
  homeLoanAmount: { type: Number },
  homeValue: { type: Number },
  monthlyMortgagePayment: { type: Number },

  otherRealEstate: { type: Boolean },
  otherRealEstateValue: { type: Number },
  otherRealEstateLoan: { type: Number },
  otherRealEstateMortgage: { type: Number },

  studentLoans: { type: Boolean },
  studentLoanBalance: { type: Number },
  otherDebts: { type: Boolean },
  otherDebtsDetails: [otherDebtDetailsSchema],  // Array of other debts with description and amount

  // Investments and Emergency Savings
  anytaxableAssets: { type: Boolean},
  taxableAssets: [taxableAssetSchema],  // Array of taxable assets with description and value
  emergencySavings: { type: Number },

  // Retirement Accounts
  retirementAccounts: { type: Boolean },
  retirementAccountDetails: [{ type: String }],  // Array of selected retirement account types
  retirementContributions: { type: Number },
  previousEmployerCurrentValue: { type: Number },
  previousEmployerAnnualContribution: { type: Number },
  previousEmployerMatchingAmount: { type: Number },
  currentEmployerCurrentValue: { type: Number },
  currentEmployerAnnualContribution: { type: Number },
  currentEmployerMatchingAmount: { type: Number },
  rothCurrentValue: { type: Number },
  rothAnnualContribution: { type: Number },
  rothMatchingAmount: { type: Number },
  // Life Insurance Section
  termLifeInsurance: { type: Boolean },
  termLifeInsuranceFaceAmount: { type: Number },
  termLifeInsuranceCoveragePeriod: { type: Number },
  termLifeInsuranceBenefits: { type: Boolean },

  cashValueLifeInsurance: { type: Boolean },
  cashValueLifeInsuranceCoverage: [cashValueLifeInsuranceCoverageSchema],
  cashSurrenderValue: { type: Number },   // Array of policies with name and amount

  // Health Savings Account (HSA) Section 
  hasHSA: { type: Boolean },  
  hsaContribution: { type: Number }, 
  hsaBalance: { type: Number },  

  // Annuities Section 
  annuityAccounts: { type: Boolean },  
  annuityAmount: { type: Number },  
  annuityIncomeAtRetirement: { type: Number },  

  // Long-Term Care (LTC) Insurance 
  longTermCareCoverage: { type: Boolean },  
  ltcCoverageAmount: { type: Number },  
  ltcMonthlyPremiums: { type: Number },  

  monthlyIncome: { type: Number },
  spouseMonthlyIncome: { type: Number },
  monthlyExpenses: { type: Number },
  temporaryExpenses: { type: Number },
  temporaryExpenseYears: { type: Number },
  annualTravelExpenses: { type: Number },
  lifeInsurancePremium: { type: Number },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
