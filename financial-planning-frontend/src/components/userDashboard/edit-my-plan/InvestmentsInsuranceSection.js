import { Controller, useFieldArray } from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"

export default function InvestmentsInsuranceSection({ control, watch }) {
  const anytaxableAssets = watch("anytaxableAssets")
  const retirementAccounts = watch("retirementAccounts")
  const termLifeInsurance = watch("termLifeInsurance")
  const cashValueLifeInsurance = watch("cashValueLifeInsurance")
  const hasHSA = watch("hasHSA")
  const annuityAccounts = watch("annuityAccounts")
  const longTermCareCoverage = watch("longTermCareCoverage")
  const retirementAccountDetails = watch("retirementAccountDetails") || []
  const {
    fields: taxableAssetsFields,
    append: appendTaxableAsset,
    remove: removeTaxableAsset
  } = useFieldArray({
    control,
    name: "taxableAssets"
  })

  const {
    fields: cashValueLifeInsuranceFields,
    append: appendCashValueLifeInsurance,
    remove: removeCashValueLifeInsurance
  } = useFieldArray({
    control,
    name: "cashValueLifeInsuranceCoverage"
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investments & Insurance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Controller
            name="anytaxableAssets"
            control={control}
            render={({ field }) => (
              <Switch
                className={
                  field.value
                    ? "bg-green-500" // Green when switched on
                    : "bg-gray-400" // Gray when switched off
                }
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="anytaxableAssets">
            Do you have any taxable assets?
          </Label>
        </div>
        {anytaxableAssets && (
  <>
    {taxableAssetsFields.map((field, index) => (
      <div key={field.id} className="flex items-center space-x-2">
        <Controller
          name={`taxableAssets.${index}.description`}
          control={control}
          render={({ field }) => <Input {...field} placeholder="Asset description" />}
        />
        <Controller
          name={`taxableAssets.${index}.value`}
          control={control}
          render={({ field }) => <Input {...field} type="number" placeholder="Value" />}
        />
        <Button type="button" onClick={() => removeTaxableAsset(index)}>
          Remove
        </Button>
      </div>
    ))}
    <Button type="button" onClick={() => appendTaxableAsset({ description: "", value: 0 })}>
      Add Taxable Asset
    </Button>
  </>
)}



        <div>
          <Label htmlFor="emergencySavings">Emergency Savings</Label>
          <Controller
            name="emergencySavings"
            control={control}
            rules={{ required: "Emergency savings is required", min: 0 }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Controller
            name="retirementAccounts"
            control={control}
            render={({ field }) => (
              <Switch
                className={
                  field.value
                    ? "bg-green-500" // Green when switched on
                    : "bg-gray-400" // Gray when switched off
                }
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="retirementAccounts">
            Do you have retirement accounts?
          </Label>
        </div>
        {retirementAccounts && (
          <>
            <div>
              <Label>Please specify your retirement accounts:</Label>
              <Controller
                name="retirementAccountDetails"
                control={control}
                render={({ field }) => (
                  <>
                    {["previousEmployer", "currentEmployer", "roth"].map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={field.value?.includes(type)}
                          onCheckedChange={checked => {
                            const updatedValue = checked
                              ? [...(field.value || []), type]
                              : field.value.filter(t => t !== type)
                            field.onChange(updatedValue)
                          }}
                        />
                        <Label htmlFor={type}>
                          {
                            type === "previousEmployer"
                              ? "Previous employer 401(k), IRA, SEP IRA (Pre-tax)"
                              : type === "currentEmployer"
                              ? "Current employer 401(k)"
                              : "Roth 401(k), Roth IRA (Post-tax)"
                          }
                        </Label>
                      </div>
                    ))}
                  </>
                )}
              />
            </div>

            {retirementAccountDetails.includes("previousEmployer") && (
              <>
                <div>
                  <Label htmlFor="previousEmployerCurrentValue">
                    Current value of your previous employer 401(k), IRA, SEP IRA (Pre-tax):
                  </Label>
                  <Controller
                    name="previousEmployerCurrentValue"
                    control={control}
                    rules={{ required: "Please provide the current value." }}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </div>
                <div>
                  <Label htmlFor="previousEmployerAnnualContribution">
                    Annual contribution to your previous employer 401(k), IRA, SEP IRA (Pre-tax):
                  </Label>
                  <Controller
                    name="previousEmployerAnnualContribution"
                    control={control}
                    rules={{ required: "Please provide the annual contribution." }}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </div>
                <div>
                  <Label htmlFor="previousEmployerMatchingAmount">
                    Matching amount for your previous employer 401(k), IRA, SEP IRA (Pre-tax):
                  </Label>
                  <Controller
                    name="previousEmployerMatchingAmount"
                    control={control}
                    rules={{ required: "Please provide the matching amount." }}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </div>
              </>
            )}

            {retirementAccountDetails.includes("currentEmployer") && (
              <>
                <div>
                  <Label htmlFor="currentEmployerCurrentValue">
                    Current value of your current employer 401(k):
                  </Label>
                  <Controller
                    name="currentEmployerCurrentValue"
                    control={control}
                    rules={{ required: "Please provide the current value." }}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </div>
                <div>
                  <Label htmlFor="currentEmployerAnnualContribution">
                    Annual contribution to your current employer 401(k):
                  </Label>
                  <Controller
                    name="currentEmployerAnnualContribution"
                    control={control}
                    rules={{ required: "Please provide the annual contribution." }}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </div>
                <div>
                  <Label htmlFor="currentEmployerMatchingAmount">
                    Matching amount for your current employer 401(k):
                  </Label>
                  <Controller
                    name="currentEmployerMatchingAmount"
                    control={control}
                    rules={{ required: "Please provide the matching amount." }}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </div>
              </>
            )}

            {retirementAccountDetails.includes("roth") && (
              <>
                <div>
                  <Label htmlFor="rothCurrentValue">
                    Current value of your Roth 401(k), Roth IRA (Post-tax):
                  </Label>
                  <Controller
                    name="rothCurrentValue"
                    control={control}
                    rules={{ required: "Please provide the current value." }}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </div>
                <div>
                  <Label htmlFor="rothAnnualContribution">
                    Annual contribution to your Roth 401(k), Roth IRA (Post-tax):
                  </Label>
                  <Controller
                    name="rothAnnualContribution"
                    control={control}
                    rules={{ required: "Please provide the annual contribution." }}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </div>
                <div>
                  <Label htmlFor="rothMatchingAmount">
                    Matching amount for your Roth 401(k), Roth IRA (Post-tax):
                  </Label>
                  <Controller
                    name="rothMatchingAmount"
                    control={control}
                    rules={{ required: "Please provide the matching amount." }}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </div>
              </>
            )}
          </>
        )}
        <div className="flex items-center space-x-2">
          <Controller
            name="termLifeInsurance"
            control={control}
            render={({ field }) => (
              <Switch
                className={
                  field.value
                    ? "bg-green-500" // Green when switched on
                    : "bg-gray-400" // Gray when switched off
                }
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="termLifeInsurance">
            Do you have term life insurance?
          </Label>
        </div>
        {termLifeInsurance && (
          <>
            <div>
              <Label htmlFor="termLifeInsuranceFaceAmount">
                Term Life Insurance Face Amount
              </Label>
              <Controller
                name="termLifeInsuranceFaceAmount"
                control={control}
                rules={{
                  required: "Term life insurance face amount is required",
                  min: 0
                }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
            <div>
              <Label htmlFor="termLifeInsuranceCoveragePeriod">
                Term Life Insurance Coverage Period (years)
              </Label>
              <Controller
                name="termLifeInsuranceCoveragePeriod"
                control={control}
                rules={{
                  required: "Term life insurance coverage period is required",
                  min: 0
                }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Controller
                name="termLifeInsuranceBenefits"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="termLifeInsuranceBenefits">
                Do you have term life insurance benefits?
              </Label>
            </div>
          </>
        )}
        <div className="flex items-center space-x-2">
          <Controller
            name="cashValueLifeInsurance"
            control={control}
            render={({ field }) => (
              <Switch
                className={
                  field.value
                    ? "bg-green-500" // Green when switched on
                    : "bg-gray-400" // Gray when switched off
                }
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="cashValueLifeInsurance">
            Do you have cash value life insurance?
          </Label>
        </div>
        {cashValueLifeInsurance && (
  <>
    {cashValueLifeInsuranceFields.map((field, index) => (
      <div key={field.id} className="flex items-center space-x-2">
        <Controller
          name={`cashValueLifeInsuranceCoverage.${index}.policy`}
          control={control}
          render={({ field }) => <Input {...field} placeholder="Policy name" />}
        />
        <Controller
          name={`cashValueLifeInsuranceCoverage.${index}.amount`}
          control={control}
          render={({ field }) => <Input {...field} type="number" placeholder="Amount" />}
        />
        <Button
          type="button"
          onClick={() => removeCashValueLifeInsurance(index)}
        >
          Remove
        </Button>
      </div>
    ))}
    <Button
      type="button"
      onClick={() => appendCashValueLifeInsurance({ policy: "", amount: 0 })}
    >
      Add Cash Value Life Insurance
    </Button>
    <div>
      <Label htmlFor="cashSurrenderValue">Cash Surrender Value</Label>
      <Controller
        name="cashSurrenderValue"
        control={control}
        rules={{ required: "Cash surrender value is required", min: 0 }}
        render={({ field }) => <Input type="number" {...field} />}
      />
    </div>
  </>
)}
        <div className="flex items-center space-x-2">
          <Controller
            name="hasHSA"
            control={control}
            render={({ field }) => (
              <Switch
                className={
                  field.value
                    ? "bg-green-500" // Green when switched on
                    : "bg-gray-400" // Gray when switched off
                }
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="hasHSA">
            Do you have a Health Savings Account (HSA)?
          </Label>
        </div>
        {hasHSA && (
          <>
            <div>
              <Label htmlFor="hsaContribution">Annual HSA Contribution</Label>
              <Controller
                name="hsaContribution"
                control={control}
                rules={{ required: "HSA contribution is required", min: 0 }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
            <div>
              <Label htmlFor="hsaBalance">HSA Balance</Label>
              <Controller
                name="hsaBalance"
                control={control}
                rules={{ required: "HSA balance is required", min: 0 }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
          </>
        )}
        <div className="flex items-center space-x-2">
          <Controller
            name="annuityAccounts"
            control={control}
            render={({ field }) => (
              <Switch
                className={
                  field.value
                    ? "bg-green-500" // Green when switched on
                    : "bg-gray-400" // Gray when switched off
                }
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="annuityAccounts">Do you have annuity accounts?</Label>
        </div>
        {annuityAccounts && (
          <>
            <div>
              <Label htmlFor="annuityAmount">Annuity Amount</Label>
              <Controller
                name="annuityAmount"
                control={control}
                rules={{ required: "Annuity amount is required", min: 0 }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
            <div>
              <Label htmlFor="annuityIncomeAtRetirement">
                Expected Annuity Income at Retirement
              </Label>
              <Controller
                name="annuityIncomeAtRetirement"
                control={control}
                rules={{
                  required: "Expected annuity income at retirement is required",
                  min: 0
                }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
          </>
        )}
        <div className="flex items-center space-x-2">
          <Controller
            name="longTermCareCoverage"
            control={control}
            render={({ field }) => (
              <Switch
                className={
                  field.value
                    ? "bg-green-500" // Green when switched on
                    : "bg-gray-400" // Gray when switched off
                }
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="longTermCareCoverage">
            Do you have long-term care coverage?
          </Label>
        </div>
        {longTermCareCoverage && (
          <>
            <div>
              <Label htmlFor="ltcCoverageAmount">
                Long-Term Care Coverage Amount
              </Label>
              <Controller
                name="ltcCoverageAmount"
                control={control}
                rules={{
                  required: "Long-term care coverage amount is required",
                  min: 0
                }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
            <div>
              <Label htmlFor="ltcMonthlyPremiums">
                Long-Term Care Monthly Premiums
              </Label>
              <Controller
                name="ltcMonthlyPremiums"
                control={control}
                rules={{
                  required: "Long-term care monthly premiums are required",
                  min: 0
                }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
