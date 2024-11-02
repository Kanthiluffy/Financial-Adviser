import React from 'react';
import { Edit2, ChevronRight } from 'lucide-react';

interface SurveySummaryProps {
  surveyData: {
    age: number;
    yearsUntilRetirement: number;
    emergencySavings: number;
    retirementContributions: number;
  };
  onEdit: () => void;
  onViewFull: () => void;
}

export function SurveySummary({ surveyData, onEdit, onViewFull }: SurveySummaryProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Survey Summary</h2>
        <button onClick={onEdit}>
          <Edit2 className="text-blue-600 hover:text-blue-700" size={24} />
        </button>
      </div>
      <dl className="space-y-3">
        <div className="flex justify-between">
          <dt className="text-gray-600">Age</dt>
          <dd className="text-gray-900 font-medium">{surveyData.age}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Years until retirement</dt>
          <dd className="text-gray-900 font-medium">{surveyData.yearsUntilRetirement}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Emergency savings</dt>
          <dd className="text-gray-900 font-medium">${surveyData.emergencySavings.toLocaleString()}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Annual retirement contribution</dt>
          <dd className="text-gray-900 font-medium">${surveyData.retirementContributions.toLocaleString()}</dd>
        </div>
      </dl>
      <button 
        onClick={onViewFull}
        className="mt-4 w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <span>View full summary</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}