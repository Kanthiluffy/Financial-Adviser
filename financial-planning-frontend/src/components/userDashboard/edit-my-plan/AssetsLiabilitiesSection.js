import { Controller, useFieldArray } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function AssetsLiabilitiesSection({ control, watch }) {
  const ownHome = watch("ownHome");
  const otherRealEstate = watch("otherRealEstate");
  const studentLoans = watch("studentLoans");
  const otherDebts = watch("otherDebts");

  const {
    fields: otherDebtsFields,
    append: appendOtherDebt,
    remove: removeOtherDebt,
  } = useFieldArray({
    control,
    name: "otherDebtsDetails",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets & Liabilities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Own Home */}
        <div className="flex items-center space-x-2">
          <Controller
            name="ownHome"
            control={control}
            render={({ field }) => (
              <Switch
                className={
                  field.value
                    ? "bg-green-500" // Green when switched on
                    : "bg-gray-400" // Red when switched off
                }
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="ownHome">Do you own a home?</Label>
        </div>
        {ownHome && (
          <>
            <div>
              <Label htmlFor="homeLoanAmount">Home Loan Amount</Label>
              <Controller
                name="homeLoanAmount"
                control={control}
                rules={{ required: "Home loan amount is required", min: 0 }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
            <div>
              <Label htmlFor="homeValue">Home Value</Label>
              <Controller
                name="homeValue"
                control={control}
                rules={{ required: "Home value is required", min: 0 }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
            <div>
              <Label htmlFor="monthlyMortgagePayment">
                Monthly Mortgage Payment
              </Label>
              <Controller
                name="monthlyMortgagePayment"
                control={control}
                rules={{
                  required: "Monthly mortgage payment is required",
                  min: 0,
                }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
          </>
        )}

        {/* Other Real Estate */}
        <div className="flex items-center space-x-2">
          <Controller
            name="otherRealEstate"
            control={control}
            render={({ field }) => (
              <Switch
                className={
                  field.value
                    ? "bg-green-500" // Green when switched on
                    : "bg-gray-400" // Red when switched off
                }
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="otherRealEstate">Do you own other real estate?</Label>
        </div>
        {otherRealEstate && (
          <>
            <div>
              <Label htmlFor="otherRealEstateValue">
                Other Real Estate Value
              </Label>
              <Controller
                name="otherRealEstateValue"
                control={control}
                rules={{
                  required: "Other real estate value is required",
                  min: 0,
                }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
            <div>
              <Label htmlFor="otherRealEstateLoan">
                Other Real Estate Loan
              </Label>
              <Controller
                name="otherRealEstateLoan"
                control={control}
                rules={{
                  required: "Other real estate loan is required",
                  min: 0,
                }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
            <div>
              <Label htmlFor="otherRealEstateMortgage">
                Other Real Estate Mortgage
              </Label>
              <Controller
                name="otherRealEstateMortgage"
                control={control}
                rules={{
                  required: "Other real estate mortgage is required",
                  min: 0,
                }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
          </>
        )}

        {/* Student Loans */}
        <div className="flex items-center space-x-2">
          <Controller
            name="studentLoans"
            control={control}
            render={({ field }) => (
              <Switch
                className={
                  field.value
                    ? "bg-green-500" // Green when switched on
                    : "bg-gray-400" // Red when switched off
                }
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="studentLoans">Do you have student loans?</Label>
        </div>
        {studentLoans && (
          <div>
            <Label htmlFor="studentLoanBalance">Student Loan Balance</Label>
            <Controller
              name="studentLoanBalance"
              control={control}
              rules={{ required: "Student loan balance is required", min: 0 }}
              render={({ field }) => <Input type="number" {...field} />}
            />
          </div>
        )}

        {/* Other Debts */}
        <div className="flex items-center space-x-2">
          <Controller
            name="otherDebts"
            control={control}
            render={({ field }) => (
              <Switch
                className={
                  field.value
                    ? "bg-green-500" // Green when switched on
                    : "bg-gray-400" // Red when switched off
                }
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="otherDebts">Do you have other debts?</Label>
        </div>
        {otherDebts && (
          <>
            {otherDebtsFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Controller
                  name={`otherDebtsDetails.${index}.description`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Debt description" />
                  )}
                />
                <Controller
                  name={`otherDebtsDetails.${index}.amount`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="number" placeholder="Amount" />
                  )}
                />
                <Button type="button" onClick={() => removeOtherDebt(index)}>
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              onClick={() => appendOtherDebt({ description: "", amount: 0 })}
            >
              Add Other Debt
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
