import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { PhoneCall, Calendar } from 'lucide-react';

export default function AdvisorCTA() {
  const handleScheduleCall = () => {
    // This could be integrated with a scheduling service like Calendly
    window.open('https://calendly.com/your-advisor', '_blank');
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PhoneCall className="h-5 w-5" />
          Need Professional Guidance?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-blue-100">
          Get personalized advice from our financial experts to help you achieve your goals.
        </p>
        <Button
          onClick={handleScheduleCall}
          className="w-full bg-white text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Schedule a Free Consultation
        </Button>
      </CardContent>
    </Card>
  );
}