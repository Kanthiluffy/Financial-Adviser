import React from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';

interface MissingInfoProps {
  missingInfo: string[];
  onUpdate: () => void;
}

export function MissingInfo({ missingInfo, onUpdate }: MissingInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Missing Information</h2>
        <AlertCircle className="text-amber-500" size={24} />
      </div>
      {missingInfo.length > 0 ? (
        <ul className="space-y-3">
          {missingInfo.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <AlertCircle className="text-amber-500 flex-shrink-0" size={20} />
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">All required information has been provided!</p>
      )}
      <button 
        onClick={onUpdate}
        className="mt-4 w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <span>Update information</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}