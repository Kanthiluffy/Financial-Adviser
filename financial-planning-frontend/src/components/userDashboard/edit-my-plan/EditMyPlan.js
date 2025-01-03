"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import DemographicsSection from "./DemographicsSection";
import GoalsSection from "./GoalsSection";
import AssetsLiabilitiesSection from "./AssetsLiabilitiesSection";
import InvestmentsInsuranceSection from "./InvestmentsInsuranceSection";
import IncomeExpensesSection from "./IncomeExpensesSection";
import { Loader2 } from "lucide-react";
import Layout from "../Layout"; // Import the Layout component

export default function EditMyPlan() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { control, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/survey/edit`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Set default values for the form
        Object.keys(response.data).forEach((key) => {
          setValue(key, response.data[key]);
        });
        setLoading(false);
      } catch (err) {
        setError("Error fetching survey data.");
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/survey/edit`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Your plan has been updated successfully.");
      navigate("/user-dashboard"); // Redirect to UserDashboard
    } catch (err) {
      alert("Failed to update your plan. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <Layout>
      <ScrollArea className="h-screen">
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Edit My Plan</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Tabs defaultValue="demographics">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="assets">Assets & Liabilities</TabsTrigger>
                <TabsTrigger value="investments">
                  Investments & Insurance
                </TabsTrigger>
                <TabsTrigger value="income">Income & Expenses</TabsTrigger>
              </TabsList>
              <TabsContent value="demographics">
                <DemographicsSection control={control} watch={watch} />
              </TabsContent>
              <TabsContent value="goals">
                <GoalsSection control={control} watch={watch} />
              </TabsContent>
              <TabsContent value="assets">
                <AssetsLiabilitiesSection control={control} watch={watch} />
              </TabsContent>
              <TabsContent value="investments">
                <InvestmentsInsuranceSection control={control} watch={watch} />
              </TabsContent>
              <TabsContent value="income">
                <IncomeExpensesSection control={control} />
              </TabsContent>
            </Tabs>
            <Button type="submit" className="mt-6">
              Save Changes
            </Button>
          </form>
        </div>
      </ScrollArea>
    </Layout>
  );
}
