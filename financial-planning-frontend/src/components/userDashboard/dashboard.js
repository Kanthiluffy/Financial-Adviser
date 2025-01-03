'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { ArrowRight, DollarSign, PiggyBank, Shield, Stethoscope, Heart, Calendar, Users, GraduationCap, CreditCard, Home, Book, Plus, HelpCircle, BarChart, Menu, User, Wallet, Minus, FileEdit, Settings, Calculator, UserPlus, FileText, AlertTriangle } from 'lucide-react'
import { Button } from "./ui/button"
import Layout from './Layout'
import { ArticlesComponent } from './articlesnew'
import UserProfile from './UserProfile'
import AdvisorCTA from './AdvisorCTA'
import LastUpdate from './LastUpdate'


// ... (keep the tooltipData and other constant data as is)
const generateTooltipData = (surveyData) => {
  const data = surveyData || {};

  // Helper function to validate and aggregate data
  const getData = (condition, value) => (condition ? value : 0);

  return {
    "Tax Now": [
  ...(
    Array.isArray(data.taxableAssets) && data.taxableAssets.length > 0
      ? data.taxableAssets.map(asset => ({
          label: asset.description,
          amount: asset.value || 0,
        }))
      : [{ label: 'No Taxable Assets Reported', amount: 0 }]
  ),

      {
        label: 'Bank Savings (for emergency funds)',
        amount: getData(true, data.emergencySavings),
      },
    ],
    "Tax Deferred": [
      {
        label: 'Previous Employer 401K / IRA / SEP IRA (Pre-Tax)',
        amount: getData(data.retirementAccounts, data.previousEmployerCurrentValue),
      },
      {
        label: 'Current Employer 401K',
        amount: getData(data.retirementAccounts, data.currentEmployerCurrentValue),
      },
    ],
    "Tax Exempt": [
      {
        label: 'Roth 401K / Roth IRA (Post-Tax)',
        amount: getData(data.retirementAccounts, data.rothCurrentValue),
      },
      {
        label: 'Health Savings Account Balance and Annual Contributions',
        amount: getData(data.hasHSA, (data.hsaBalance || 0) + (data.hsaContribution || 0)),
      },
      {
        label: 'Cash Surrender Value of Life Insurance Plans',
        amount: getData(data.cashValueLifeInsurance, data.cashSurrenderValue),
      },
    ],
    "Primary Home": [
      { label: 'Home Value', amount: getData(data.ownHome, data.homeValue) },
      { label: 'Mortgage Loan', amount: getData(data.ownHome, data.homeLoanAmount) },
      { label: 'Monthly Mortgage Payment', amount: getData(data.ownHome, data.monthlyMortgagePayment) },
    ],
    "Investment Home": [
      { label: 'Other Real Estate Value', amount: getData(data.otherRealEstate, data.otherRealEstateValue) },
      { label: 'Other Real Estate Loan', amount: getData(data.otherRealEstate, data.otherRealEstateLoan) },
      { label: 'Other Real Estate Mortgage', amount: getData(data.otherRealEstate, data.otherRealEstateMortgage) },
    ],
    "Other Debts": data.otherDebts
      ? data.otherDebtsDetails.map((debt) => ({
          label: debt.description,
          amount: debt.amount,
        }))
      : [{ label: 'No other debts reported', amount: 0 }],
    "Student Loans": [
      { label: 'Total Student Loan Balance', amount: getData(data.studentLoans, data.studentLoanBalance) },
    ],
    "HSA": [
      { label: 'Health Savings Account Balance', amount: getData(data.hasHSA, data.hsaBalance) },
      { label: 'Annual HSA Contributions', amount: getData(data.hasHSA, data.hsaContribution) },
    ],
    "Term Life Insurance": [
      { label: 'Term Life Insurance Face Amount', amount: getData(data.termLifeInsurance, data.termLifeInsuranceFaceAmount) },
      { label: 'Coverage Period (Years)', amount: getData(data.termLifeInsurance, data.termLifeInsuranceCoveragePeriod) },
    ],
    "Cash Value Insurance": [
      ...(data.cashValueLifeInsurance && Array.isArray(data.cashValueLifeInsuranceCoverage) 
        ? data.cashValueLifeInsuranceCoverage.map(policy => ({
            label: policy.policy,
            amount: policy.amount,
          }))
        : []),
      { label: 'Cash Surrender Value', amount: getData(data.cashValueLifeInsurance, data.cashSurrenderValue) },
    ],
    "Long-Term Care": [
      { label: 'Long-Term Care Coverage Amount', amount: getData(data.longTermCareCoverage, data.ltcCoverageAmount) },
      { label: 'Monthly Premiums', amount: getData(data.longTermCareCoverage, data.ltcMonthlyPremiums) },
    ],
    "Annuity": [
      { label: 'Annuity Amount', amount: getData(data.annuityAccounts, data.annuityAmount) },
      { label: 'Annuity Income at Retirement', amount: getData(data.annuityAccounts, data.annuityIncomeAtRetirement) },
    ],
    "miscellaneous": [
      { label: 'Annual Travel Expenses', amount: data.annualTravelExpenses || 0 },
      { label: 'Temporary Expenses', amount: data.temporaryExpenses || 0 },
      { label: 'Temporary Expense Years', amount: data.temporaryExpenseYears || 0 },
    ],
  };
};







const FinancialCard = ({ title, icon: Icon, color = "bg-gray-100", value = 0,tooltipData = [] }) => (
  <TooltipProvider>
    <Card className={`relative ${color} transition-all duration-300 hover:shadow-lg hover:scale-105`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center space-x-2">
          <Icon className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
  <div className="text-2xl font-bold">
    {value !== null && value !== undefined ? `$${value.toLocaleString()}` : 'N/A'}
  </div>
</CardContent>

      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-4 w-4 absolute top-2 right-2 text-gray-400 cursor-help" />
        </TooltipTrigger>
        <TooltipContent side="right" className="w-56 p-2 bg-white rounded-md shadow-lg">
          <h4 className="font-semibold mb-2">{title} Breakdown:</h4>
          <ul className="space-y-1">
            {tooltipData[title]?.length > 0 ? (
              tooltipData[title].map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.label}:</span>
                  <span>{item.amount != null ? `$${item.amount.toLocaleString()}` : 'N/A'}</span>
                </li>
              ))
            ) : (
              <li>No data available</li>
            )}
          </ul>


        </TooltipContent>
      </Tooltip>
    </Card>
  </TooltipProvider>
);


const Speedometer = ({ score, label }) => {
  const centerX = 100
  const centerY = 90
  const radius = 80
  const needleLength = 70
  const angle = Math.PI * (score / 100)
  const arcX = centerX + radius * Math.cos(Math.PI - angle)
  const arcY = centerY - radius * Math.sin(Math.PI - angle)
  const needleX = centerX + needleLength * Math.cos(Math.PI - angle)
  const needleY = centerY - needleLength * Math.sin(Math.PI - angle)

  return (
    <div className="relative w-full h-40">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <path d="M20 90 A 80 80 0 0 1 180 90" fill="none" stroke="#e5e7eb" strokeWidth="20" />
        <path
          d={`M20 90 A 80 80 0 0 1 ${arcX} ${arcY}`}
          fill="none"
          stroke="#10b981"
          strokeWidth="20"
        />
        <line
          x1={centerX}
          y1={centerY}
          x2={needleX}
          y2={needleY}
          stroke="#4b5563"
          strokeWidth="2"
        />
        <circle cx={centerX} cy={centerY} r="5" fill="#4b5563" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold">{score}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  )
}

const SummaryCard = ({ title, icon: Icon, status }) => (
  <Card className={`${status === 'good' ? 'bg-emerald-100' : 'bg-rose-100'} transition-all duration-300 hover:shadow-lg hover:scale-105`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium flex items-center space-x-2">
        <Icon className="h-5 w-5" />
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className={`text-lg font-semibold ${status === 'good' ? 'text-emerald-700' : 'text-rose-700'}`}>
        {status === 'good' ? 'Good' : 'Needs Attention'}
      </div>
    </CardContent>
  </Card>
)



const summaryCards = [
  { title: "Life Insurance", icon: Heart, status: "good" },
  { title: "Long Term Care", icon: Stethoscope, status: "bad" },
  { title: "Tax Exempt", icon: Shield, status: "good" },
  { title: "Cash Flow", icon: ArrowRight, status: "good" },
  { title: "College Savings", icon: GraduationCap, status: "bad" },
  { title: "Longevity Risk", icon: Calendar, status: "good" },
  { title: "Market Risk", icon: BarChart, status: "bad" },
  { title: "Education", icon: Book, status: "good" },
]

const populateCardData = (surveyData) => {
  const cards = [
    {
      title: "Primary Home",
      color: "bg-green-100",
      value: surveyData.ownHome
        ? `$${surveyData.homeValue?.toLocaleString() || 0}`
        : "$0",
      icon: Home,
    },
    {
      title: "Student Loans",
      color: "bg-red-100",
      value: surveyData.studentLoans
        ? `$${surveyData.studentLoanBalance?.toLocaleString() || 0}`
        : "$0",
      icon: GraduationCap,
    },
    {
      title: "Other Debts",
      color: "bg-red-100",
      value: surveyData.otherDebts
        ? `$${surveyData.otherDebtsDetails
            ?.reduce((sum, debt) => sum + debt.amount, 0)
            .toLocaleString() || 0}`
        : "$0",
      icon: CreditCard,
    },
    {
      title: "Investment Home",
      color: "bg-green-100",
      value: surveyData.otherRealEstate
        ? `$${surveyData.otherRealEstateValue?.toLocaleString() || 0}`
        : "$0",
      icon: Home,
    },
    {
      title: "Student Expenses",
      color: "bg-red-100",
      value: 0,
      icon: Book,
    },
    {
      title: "miscellaneous",
      color: "bg-green-100",
      value: `$${(
        (surveyData.annualTravelExpenses || 0) +
        (surveyData.temporaryExpenses || 0)
      ).toLocaleString()}`,
      icon: null,
    },
  ];

  return cards;
};


export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [surveyData, setSurveyData] = useState(null)
  const [financialScore, setFinancialScore] = useState(0)
  const [projectedScore, setProjectedScore] = useState(0)
  const [userEmail, setUserEmail] = useState('')
  const [lastUpdateTime, setLastUpdateTime] = useState(null)
  const [tooltipData, setTooltipData] = useState({})
  const [cards, setCards] = useState([])

  // const cards = populateCardData(surveyData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(process.env.REACT_APP_API_URL+'/api/survey/status', {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        setSurveyData(response.data.survey)
        setUserEmail(response.data.email)
        setLastUpdateTime(response.data.lastUpdated)
        calculateScores(response.data.survey)
        const tooltips = generateTooltipData(response.data.survey);
        setTooltipData(tooltips);
        setCards(populateCardData(response.data.survey));
      } catch (err) {
        setError(err.message)
        console.error('Error fetching survey data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  useEffect(() => {
    console.log('Updated Tooltip data:', tooltipData);
    console.log('Survey data:', surveyData);
    console.log('Cards:', cards);
  }, [tooltipData, surveyData, cards]);

  
  

  const calculateScores = (data) => {
    if (!data) return

    // Calculate current financial score
    let currentScore = 0
    let maxPoints = 100

    // Emergency savings score (20 points)
    if (data.emergencySavings) {
      const monthlyExpenses = data.monthlyExpenses || 5000
      const savingsRatio = data.emergencySavings / (monthlyExpenses * 6)
      currentScore += Math.min(20, Math.round(savingsRatio * 20))
    }

    // Retirement planning score (20 points)
    if (data.retirementAccounts) {
      currentScore += 20
    }

    // Debt management score (20 points)
    if (!data.studentLoans && !data.otherDebts) {
      currentScore += 20
    }

    // Insurance coverage score (20 points)
    if (data.termLifeInsurance || data.cashValueLifeInsurance) {
      currentScore += 20
    }

    // Investment diversification score (20 points)
    if (data.taxableAssets && data.taxableAssets.length > 0) {
      currentScore += 20
    }

    setFinancialScore(Math.round((currentScore / maxPoints) * 100))
    setProjectedScore(Math.min(100, Math.round((currentScore / maxPoints) * 100) + 15))
  }
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-rose-50 p-6 rounded-lg shadow-lg">
            <AlertTriangle className="h-12 w-12 text-rose-600 mx-auto mb-4" />
            <p className="text-rose-700 text-center mb-4">Error loading dashboard: {error}</p>
            <Button 
              className="w-full" 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Retry
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex h-screen w-screen overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
        <main className="container mx-auto p-6 space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Financial Dashboard</h1>
        
          <RetirementPlannerFlowchart surveyData={surveyData} />

          <section className="bg-gradient-to-br from-indigo-50 to-blue-100 p-6 rounded-xl shadow-lg">
  <h2 className="text-2xl font-bold mb-6 text-indigo-800">Financial Categories</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <FinancialCard
      title="Tax Now"
      icon={DollarSign}
      color="bg-blue-50"
      value={surveyData.anytaxableAssets ? surveyData.taxableAssets.reduce((sum, asset) => sum + asset.value, 0) : 0}
      tooltipData={tooltipData}
    />
    <FinancialCard
      title="Tax Deferred"
      icon={PiggyBank}
      color="bg-green-50"
      value={
        (surveyData.retirementAccounts ? surveyData.currentEmployerCurrentValue : 0) +
        (surveyData.previousEmployerCurrentValue || 0)
      }
      tooltipData={tooltipData}
    />
    <FinancialCard
      title="Tax Exempt"
      icon={Shield}
      color="bg-yellow-50"
      value={surveyData.rothCurrentValue || 0}
      tooltipData={tooltipData}
    />
    <FinancialCard
      title="HSA"
      icon={Stethoscope}
      color="bg-purple-50"
      value={surveyData.hasHSA ? surveyData.hsaBalance : 0}
      tooltipData={tooltipData}
    />
    <FinancialCard
      title="Term Life Insurance"
      icon={Heart}
      color="bg-red-50"
      value={surveyData.termLifeInsurance ? surveyData.termLifeInsuranceFaceAmount : 0}
      tooltipData={tooltipData}
    />
    <FinancialCard
      title="Cash Value Insurance"
      icon={DollarSign}
      color="bg-orange-50"
      value={
        surveyData.cashValueLifeInsurance
          ? surveyData.cashValueLifeInsuranceCoverage.reduce((sum, policy) => sum + policy.amount, 0)
          : 0
      }
      tooltipData={tooltipData}
    />
    <FinancialCard
      title="Long Term Care"
      icon={Stethoscope}
      color="bg-teal-50"
      value={surveyData.longTermCareCoverage ? surveyData.ltcCoverageAmount : 0}
      tooltipData={tooltipData}
    />
    <FinancialCard
      title="Annuity"
      icon={Calendar}
      color="bg-pink-50"
      value={surveyData.annuityAccounts ? surveyData.annuityAmount : 0}
      tooltipData={tooltipData}
    />
    <FinancialCard
      title="Inheritance"
      icon={Users}
      color="bg-indigo-50"
      value={surveyData.inheritanceAmount || 0} // Add this field to surveyData if relevant
      tooltipData={tooltipData}
    />
  </div>
</section>



          <section className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-emerald-800">Liabilities and Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <TooltipProvider key={index}>
                <Card className={`${card.color} transition-all duration-300 hover:shadow-lg hover:scale-105 relative`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {card.title}
                      {card.icon && <card.icon className="h-5 w-5 text-gray-500" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                  </CardContent>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 absolute top-2 right-2 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="w-56 p-2 bg-white rounded-md shadow-lg">
                      <h4 className="font-semibold mb-2">{card.title} Breakdown:</h4>
                      <ul className="space-y-1">
                        {tooltipData[card.title]?.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex justify-between">
                            <span>{item.label}:</span>
                            <span>${item.amount}</span>
                          </li>
                        )) || <li>No data available</li>}
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </Card>
              </TooltipProvider>
            ))}
          </div>
        </section>


          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-100 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-800">Current Score</CardTitle>
              </CardHeader>
              <CardContent>
                <Speedometer score={financialScore} label="Current" />
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-violet-50 to-purple-100 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-violet-800">Score with Controlled Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <Speedometer score={projectedScore} label="Projected" />
              </CardContent>
            </Card>
          </section>

          <div className="max-w-2xl mx-auto">
            <AdvisorCTA />
          </div>

          <section className="bg-gradient-to-br from-rose-50 to-pink-100 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-rose-800">Summary and Suggestions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {summaryCards.map((card, index) => (
                <SummaryCard key={index} title={card.title} icon={card.icon} status={card.status} />
              ))}
            </div>
          </section>

          <div className="pb-8">
            <ArticlesComponent className="max-w-full md:max-w-3xl lg:max-w-4xl mx-auto" />
          </div>
        </main>
      </div>
    </Layout>
  )
}


  function RetirementPlannerFlowchart({ surveyData }) {
    // Initialize state using survey data or defaults
    const [myIncome, setMyIncome] = useState(surveyData?.monthlyIncome || 0);
    const [spouseIncome, setSpouseIncome] = useState(surveyData?.spouseMonthlyIncome || 0);
    const [expenses, setExpenses] = useState(surveyData?.monthlyExpenses || 0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [cashFlow, setCashFlow] = useState(0);

  useEffect(() => {
    const newTotalIncome = myIncome + spouseIncome;
    setTotalIncome(newTotalIncome);
    setCashFlow(newTotalIncome - expenses);
  }, [myIncome, spouseIncome, expenses]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      
      {/* Flowchart Container */}
      <div className="flex flex-col md:flex-row md:justify-center md:items-center md:space-x-4 space-y-4 md:space-y-0">
        {/* Income Section */}
        <div className="flex flex-col items-center space-y-2">
          <IncomeCard
            title="My Income"
            icon={<Users className="h-6 w-6 text-blue-500" />}
            value={myIncome}
          />
          <IncomeCard
            title="Spouse Income"
            icon={<Users className="h-6 w-6 text-green-500" />}
            value={spouseIncome}
          />
        </div>
        {/* Arrow pointing to Total Income - Hidden on Mobile */}
        <svg
          className="hidden md:block w-16 h-16 mx-auto md:mx-0"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 25 L40 25 M40 25 L30 15 M40 25 L30 35"
            stroke="#CBD5E0"
            strokeWidth="2"
          />
        </svg>
        {/* Total Income */}
        <TotalIncomeCard totalIncome={totalIncome} />
        {/* Arrow pointing to Expenses - Hidden on Mobile */}
        <svg
          className="hidden md:block w-16 h-16 mx-auto md:mx-0"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 25 L40 25 M40 25 L30 15 M40 25 L30 35"
            stroke="#CBD5E0"
            strokeWidth="2"
          />
        </svg>
        {/* Expenses */}
        <ExpensesCard expenses={expenses} />
        {/* Arrow pointing to Cash Flow - Hidden on Mobile */}
        <svg
          className="hidden md:block w-16 h-16 mx-auto md:mx-0"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 25 L40 25 M40 25 L30 15 M40 25 L30 35"
            stroke="#CBD5E0"
            strokeWidth="2"
          />
        </svg>
        {/* Cash Flow */}
        <CashFlowCard cashFlow={cashFlow} />
      </div>
    </div>
  );
}

function IncomeCard({ title, icon, value }) {
  return (
    <Card className="w-full md:w-64 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <div className="text-2xl font-bold text-gray-800">${value.toFixed(2)}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function TotalIncomeCard({ totalIncome }) {
  return (
    <Card className="w-full md:w-80 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-blue-600">Total Monthly Income</CardTitle>
        <Wallet className="h-6 w-6 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-blue-800">${totalIncome.toFixed(2)}</div>
      </CardContent>
    </Card>
  
)
}

function ExpensesCard({ expenses }) {
  return (
    <Card className="w-full md:w-64 bg-gradient-to-br from-red-50 to-rose-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-red-600">Monthly Expenses</CardTitle>
        <Minus className="h-6 w-6 text-red-500" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-red-500" />
          <div className="text-2xl font-bold text-red-800">${expenses.toFixed(2)}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function CashFlowCard({ cashFlow }) {
  const textColor = cashFlow >= 0 ? 'text-green-800' : 'text-red-800'
  const bgGradient = cashFlow >= 0 ? 'from-green-50 to-emerald-100' : 'from-red-50 to-rose-100'
  const iconColor = cashFlow >= 0 ? 'text-green-500' : 'text-red-500'

  return (
    <Card className={`w-full md:w-80 bg-gradient-to-br ${bgGradient} shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">Monthly Cash Flow</CardTitle>
        <PiggyBank className={`h-6 w-6 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${textColor}`}>
          ${Math.abs(cashFlow).toFixed(2)}
          {cashFlow < 0 && <span className="text-sm font-normal ml-1">(Deficit)</span>}
        </div>
      </CardContent>
    </Card>
  )
}
