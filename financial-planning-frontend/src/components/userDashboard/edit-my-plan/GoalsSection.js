import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function GoalsSection({ control, watch }) {
  const isRetired = watch("isRetired");
  const spouseRetired = watch("spouseRetired");
  const saveForCollege = watch("saveForCollege");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Controller
            name="isRetired"
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
          <Label htmlFor="isRetired">Are you retired?</Label>
        </div>
        {!isRetired && (
          <div>
            <Label htmlFor="yearsUntilRetirement">Years Until Retirement</Label>
            <Controller
              name="yearsUntilRetirement"
              control={control}
              rules={{ required: "Years until retirement is required", min: 0 }}
              render={({ field }) => <Input type="number" {...field} />}
            />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Controller
            name="spouseRetired"
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
          <Label htmlFor="spouseRetired">Is your spouse retired?</Label>
        </div>
        {!spouseRetired && (
          <div>
            <Label htmlFor="spouseYearsUntilRetirement">
              Spouse Years Until Retirement
            </Label>
            <Controller
              name="spouseYearsUntilRetirement"
              control={control}
              rules={{
                required: "Spouse years until retirement is required",
                min: 0,
              }}
              render={({ field }) => <Input type="number" {...field} />}
            />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Controller
            name="saveForCollege"
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
          <Label htmlFor="saveForCollege">
            Do you want to save for college?
          </Label>
        </div>
        {saveForCollege && (
          <div>
            <Label htmlFor="collegeFeeSupportPercentage">
              College Fee Support Percentage
            </Label>
            <Controller
              name="collegeFeeSupportPercentage"
              control={control}
              rules={{
                required: "College fee support percentage is required",
                min: 0,
                max: 100,
              }}
              render={({ field }) => <Input type="number" {...field} />}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
