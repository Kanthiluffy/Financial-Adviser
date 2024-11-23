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

const tooltipData = {
  "Tax Now": [
    { label: 'Wages', amount: 50000 },
    { label: 'Interest', amount: 2500 },
    { label: 'Dividends', amount: 1200 },
  ],
  "Tax Deferred": [
    { label: '401(k)', amount: 15000 },
    { label: 'Traditional IRA', amount: 8000 },
    { label: 'Pension Plans', amount: 12500 },
  ],
  "Tax Exempt": [
    { label: 'Roth IRA', amount: 10000 },
    { label: 'Municipal Bonds', amount: 5000 },
  ],
  "HSA": [
    { label: 'HSA Balance', amount: 3500 },
  ],
  "Term Life Insurance": [
    { label: 'Death Benefit', amount: 500000 },
  ],
  "Cash Value Insurance": [
    { label: 'Cash Value', amount: 25000 },
    { label: 'Death Benefit', amount: 300000 },
  ],
  "Long Term Care": [
    { label: 'Daily Benefit', amount: 150 },
    { label: 'Benefit Period', amount: 3 },
  ],
  "Annuity": [
    { label: 'Current Value', amount: 75000 },
    { label: 'Annual Payout', amount: 5000 },
  ],
  "Inheritance": [
    { label: 'Expected Amount', amount: 100000 },
  ],
}

const FinancialCard = ({ title, icon: Icon, color = "bg-gray-100", tooltipContent = "" }) => (
  <TooltipProvider>
    <Card className={`relative ${color}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Icon className="h-4 w-4 mr-2 inline-block" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$0</div>
      </CardContent>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-4 w-4 absolute top-2 right-2 text-gray-400 cursor-help" />
        </TooltipTrigger>
        <TooltipContent side="right" className="w-56 p-2 bg-white rounded-md shadow-lg">
          <h4 className="font-semibold mb-2">{title} Breakdown:</h4>
          <ul className="space-y-1">
            {tooltipData[title]?.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.label}:</span>
                <span>${item.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </TooltipContent>
      </Tooltip>
    </Card>
  </TooltipProvider>
)

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

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [surveyData, setSurveyData] = useState(null)
  const [financialScore, setFinancialScore] = useState(0)
  const [projectedScore, setProjectedScore] = useState(0)
  const [userEmail, setUserEmail] = useState('')
  const [lastUpdateTime, setLastUpdateTime] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:5000/api/survey/status', {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        setSurveyData(response.data.survey)
        setUserEmail(response.data.email)
        setLastUpdateTime(response.data.lastUpdated)
        calculateScores(response.data.survey)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching survey data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-red-700">Error loading dashboard: {error}</p>
            <Button 
              className="mt-4" 
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
      <div className="flex h-screen w-screen overflow-y-auto">
        <main className="container h-screen w-screen mx-auto p-4 space-y-8">
        
          <RetirementPlannerFlowchart />

          <section className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">Financial Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FinancialCard title="Tax Now" icon={DollarSign} tooltipContent="Current taxable income and assets" />
              <FinancialCard title="Tax Deferred" icon={PiggyBank} tooltipContent="Assets with deferred tax benefits" />
              <FinancialCard title="Tax Exempt" icon={Shield} tooltipContent="Tax-free income and assets" />
              <FinancialCard title="HSA" icon={Stethoscope} tooltipContent="Health Savings Account" />
              <FinancialCard title="Term Life Insurance" icon={Heart} tooltipContent="Fixed-term life insurance coverage" />
              <FinancialCard title="Cash Value Insurance" icon={DollarSign} tooltipContent="Life insurance with a cash value component" />
              <FinancialCard title="Long Term Care" icon={Stethoscope} tooltipContent="Insurance for long-term medical care" />
              <FinancialCard title="Annuity" icon={Calendar} tooltipContent="Fixed sum paid annually" />
              <FinancialCard title="Inheritance" icon={Users} tooltipContent="Expected or received inheritance" />
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Score</CardTitle>
              </CardHeader>
              <CardContent>
                <Speedometer score={financialScore} label="Current" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Score with Controlled Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <Speedometer score={projectedScore} label="Projected" />
              </CardContent>
            </Card>
          </section>
          {/* Advisor CTA Section */}
          <div className="max-w-2xl mx-auto">
            <AdvisorCTA />
          </div>
          <div className="pb-8">
            <ArticlesComponent className="max-w-full md:max-w-3xl lg:max-w-4xl mx-auto" />
          </div>
        </main>
      </div>
    </Layout>
  )
}

function RetirementPlannerFlowchart() {
  const [myIncome, setMyIncome] = useState(5000)
  const [spouseIncome, setSpouseIncome] = useState(4000)
  const [expenses, setExpenses] = useState(3000)
  const [totalIncome, setTotalIncome] = useState(0)
  const [cashFlow, setCashFlow] = useState(0)

  useEffect(() => {
    const newTotalIncome = myIncome + spouseIncome
    setTotalIncome(newTotalIncome)
    setCashFlow(newTotalIncome - expenses)
  }, [myIncome, spouseIncome, expenses])

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Retirement Planner Dashboard</h1>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 space-y-4 md:space-y-0 md:space-x-4">
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
      <div className="flex justify-center mb-8">
        <svg className="w-full max-w-md" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L100 50 L200 0" stroke="#CBD5E0" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>
      <div className="flex justify-center mb-8">
        <TotalIncomeCard totalIncome={totalIncome} />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <svg className="w-1/3 h-12 hidden md:block" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L100 0" stroke="#CBD5E0" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
        <ExpensesCard expenses={expenses} />
      </div>
      <div className="flex justify-center mb-4">
        <svg className="w-full max-w-md" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 0 L100 50" stroke="#CBD5E0" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>
      <div className="flex justify-center">
        <CashFlowCard cashFlow={cashFlow} />
      </div>
    </div>
  )
}

function IncomeCard({ title, icon, value }) {
  return (
    <Card className="w-full md:w-64 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
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
    <Card className="w-full md:w-80 bg-blue-50 shadow-lg transition-all duration-300 hover:shadow-xl">
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
    <Card className="w-full md:w-64 bg-red-50 shadow-lg transition-all duration-300 hover:shadow-xl">
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
  const bgColor = cashFlow >= 0 ? 'bg-green-50' : 'bg-red-50'
  const iconColor = cashFlow >= 0 ? 'text-green-500' : 'text-red-500'

  return (
    <Card className={`w-full md:w-80 ${bgColor} shadow-lg transition-all duration-300 hover:shadow-xl`}>
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