import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import './styles.css';

export default function DemographicsSection({ control, watch }) {
  const hasChildren = watch("hasChildren");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demographics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Controller
            name="age"
            control={control}
            rules={{ required: "Age is required", min: 18, max: 120 }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </div>
        <div>
          <Label>Marital Status</Label>
          <Controller
            name="maritalStatus"
            control={control}
            rules={{ required: "Marital status is required" }}
            render={({ field }) => (
              <div className="radio-group">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="single"
                    id="single"
                    name="maritalStatus"
                    checked={field.value === "single"}
                    onChange={() => field.onChange("single")}
                    className="custom-radio"
                  />
                  <label htmlFor="single">Single</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="married"
                    id="married"
                    name="maritalStatus"
                    checked={field.value === "married"}
                    onChange={() => field.onChange("married")}
                    className="custom-radio"
                  />
                  <label htmlFor="married">Married</label>
                </div>
              </div>
            )}
          />
        </div>
        {watch("maritalStatus") === "married" && (
          <div>
            <Label htmlFor="spouseAge">Spouse Age</Label>
            <Controller
              name="spouseAge"
              control={control}
              rules={{ required: "Spouse age is required", min: 18, max: 120 }}
              render={({ field }) => <Input type="number" {...field} />}
            />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Controller
            name="hasChildren"
            control={control}
            render={({ field }) => (
              <Switch
                className={
                  field.value
                    ? "bg-green-500" // Green when switched on
                    : "bg-gray-400" // Neutral gray when switched off
                }
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="hasChildren">Do you have children?</Label>
        </div>
        {hasChildren && (
          <>
            <div>
              <Label htmlFor="numberOfChildren">Number of Children</Label>
              <Controller
                name="numberOfChildren"
                control={control}
                rules={{ required: "Number of children is required", min: 1 }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
            <div>
              <Label htmlFor="childrenAges">
                Children Ages (comma-separated)
              </Label>
              <Controller
                name="childrenAges"
                control={control}
                rules={{ required: "Children ages are required" }}
                render={({ field }) => (
                  <Input {...field} placeholder="e.g., 5, 7, 10" />
                )}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
