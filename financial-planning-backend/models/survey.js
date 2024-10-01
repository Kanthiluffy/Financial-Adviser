const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
  age: { type: Number, required: true },  // User's age
  maritalStatus: { type: String, enum: ['single', 'married'], required: true },  // Marital Status
  spouseAge: { type: Number },  // Spouse's age (if applicable)
  hasChildren: { type: Boolean, required: true },  // Do they have children? (Yes/No checkbox)
  childrenAges: [{ type: Number }],  // Array of children's ages (if Yes is selected)

  isRetired: { type: Boolean, required: true },  // Are they already retired?
  yearsUntilRetirement: { type: Number },  // How many more years to work (if not retired)
  isSpouseRetired: { type: Boolean },  // Is spouse retired?
  spouseYearsUntilRetirement: { type: Number },  // Spouse's years until retirement (if applicable)

  saveForChildrenEducation: { type: Boolean },  // Are they saving for children’s education?
  educationSavingsPercentage: { type: Number },  // Percentage of tuition they plan to cover

  // Assets and Liabilities Section
  ownPrimaryHome: { type: Boolean },  // Do they own their primary home?
  loanAmountPrimaryHome: { type: Number },  // Loan amount on primary home
  currentHomeValue: { type: Number },  // Current home value
  monthlyMortgagePayment: { type: Number },  // Monthly mortgage and interest payment
  ownOtherRealEstate: { type: Boolean },  // Do they own other real estate properties?
  otherRealEstateValue: { type: Number },  // Value of other real estate properties
  otherRealEstateLoanAmount: { type: Number },  // Loan amount on other real estate properties
  otherRealEstateMortgagePayment: { type: Number },  // Monthly mortgage and interest payment on other real estate
  studentLoans: { type: Boolean },  // Do they have student loans?
  studentLoanBalance: { type: Number },  // Remaining balance on student loans
  otherDebts: { type: Boolean },  // Do they have other debts?
  otherDebtDetails: { type: String },  // Other debt types and amounts

  // Income and Expenses Section
  monthlyIncome: { type: Number },  // Current monthly income
  monthlyExpenses: { type: Number },  // Current monthly expenses
  temporaryExpenses: { type: Boolean },  // Temporary expenses to be paid off in a few years
  temporaryExpenseDetails: { type: String },  // Details of temporary expenses and how long they will last
  annualTravelExpenses: { type: Number },  // Average annual travel expenses
  lifeInsurancePremium: { type: Number },  // Current life insurance premium

  // Investments and Retirement Section
  taxableAssets: { type: Number },  // Current taxable assets
  emergencySavings: { type: Number },  // Current emergency savings balance
  retirementAccounts: { type: Boolean },  // Do they have retirement accounts?
  retirementAccountTypes: [{ type: String }],  // Types of retirement accounts
  retirementAnnualContributions: { type: Number },  // Annual contributions and matching
  HSA_balance: { type: Number },  // Health Savings Account balance
  HSA_annualContributions: { type: Number },  // Annual contributions to Health Savings Account
  lifeInsuranceCashValue: { type: Number },  // Cash surrender value of life insurance policies

  // Life Insurance Section
  termLifeInsurance: { type: Boolean },  // Do they have term life insurance?
  termLifeInsuranceAmount: { type: Number },  // Term life insurance face amount
  termLifeInsurancePeriod: { type: Number },  // Term life insurance coverage period
  termLifeInsuranceLivingBenefits: { type: Boolean },  // Does it include living benefits?
  cashValueLifeInsurance: { type: Boolean },  // Do they have cash value life insurance?
  cashValueLifeInsuranceAmount: { type: Number },  // Coverage amount of cash value life insurance
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
