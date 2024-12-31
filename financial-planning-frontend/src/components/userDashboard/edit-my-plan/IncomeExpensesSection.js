import { Controller } from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function IncomeExpensesSection({ control }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income & Expenses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="monthlyIncome">Monthly Income</Label>
          <Controller
            name="monthlyIncome"
            control={control}
            rules={{ required: "Monthly income is required", min: 0 }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </div>
        <div>
          <Label htmlFor="spouseMonthlyIncome">Spouse Monthly Income</Label>
          <Controller
            name="spouseMonthlyIncome"
            control={control}
            rules={{ required: "Spouse monthly income is required", min: 0 }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </div>
        <div>
          <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
          <Controller
            name="monthlyExpenses"
            control={control}
            rules={{ required: "Monthly expenses are required", min: 0 }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </div>
        <div>
          <Label htmlFor="temporaryExpenses">Temporary Expenses</Label>
          <Controller
            name="temporaryExpenses"
            control={control}
            rules={{ required: "Temporary expenses are required", min: 0 }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </div>
        <div>
          <Label htmlFor="temporaryExpenseYears">Temporary Expense Years</Label>
          <Controller
            name="temporaryExpenseYears"
            control={control}
            rules={{ required: "Temporary expense years are required", min: 0 }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </div>
        <div>
          <Label htmlFor="annualTravelExpenses">Annual Travel Expenses</Label>
          <Controller
            name="annualTravelExpenses"
            control={control}
            rules={{ required: "Annual travel expenses are required", min: 0 }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </div>
        <div>
          <Label htmlFor="lifeInsurancePremium">Life Insurance Premium</Label>
          <Controller
            name="lifeInsurancePremium"
            control={control}
            rules={{ required: "Life insurance premium is required", min: 0 }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </div>
      </CardContent>
    </Card>
  )
}
