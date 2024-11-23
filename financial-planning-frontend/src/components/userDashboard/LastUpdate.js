import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Clock } from 'lucide-react';

export default function LastUpdate({ timestamp }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-gray-50">
      <CardContent className="py-3 flex items-center gap-2 text-sm text-gray-600">
        <Clock className="h-4 w-4" />
        <span>Last updated: {formatDate(timestamp)}</span>
      </CardContent>
    </Card>
  );
}