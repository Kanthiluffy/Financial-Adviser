'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { DollarSign, Minus, Users, Wallet, PiggyBank } from 'lucide-react'

export default function RetirementPlannerFlowchart() {
  const [myIncome, setMyIncome] = useState(5000) // Example default value
  const [spouseIncome, setSpouseIncome] = useState(4000) // Example default value
  const [expenses, setExpenses] = useState(3000) // Example default value
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
