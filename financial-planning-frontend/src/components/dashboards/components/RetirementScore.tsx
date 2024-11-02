import React from 'react';
import { PieChart } from 'lucide-react';

interface RetirementScoreProps {
  score: number;
}

export function RetirementScore({ score }: RetirementScoreProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Retirement Score</h2>
        <PieChart className="text-blue-600" size={24} />
      </div>
      <div className="flex items-center justify-center my-4">
        <div className="relative">
          <svg className="w-32 h-32">
            <circle
              className="text-gray-200"
              strokeWidth="12"
              stroke="currentColor"
              fill="transparent"
              r="58"
              cx="64"
              cy="64"
            />
            <circle
              className="text-blue-600"
              strokeWidth="12"
              strokeDasharray={364}
              strokeDashoffset={364 - (364 * score) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="58"
              cx="64"
              cy="64"
            />
          </svg>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-gray-900">
            {score}
          </span>
        </div>
      </div>
    </div>
  );
}