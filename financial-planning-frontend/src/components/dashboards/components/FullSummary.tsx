import React from 'react';
import { X } from 'lucide-react';

interface FullSummaryProps {
  surveyData: any;
  onClose: () => void;
}

export function FullSummary({ surveyData, onClose }: FullSummaryProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Full Survey Summary</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Personal Information</h3>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-gray-600">Age</dt>
                <dd className="text-gray-900 font-medium">{surveyData.age}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Marital Status</dt>
                <dd className="text-gray-900 font-medium capitalize">{surveyData.maritalStatus}</dd>
              </div>
              {surveyData.maritalStatus === 'married' && (
                <div>
                  <dt className="text-gray-600">Spouse Age</dt>
                  <dd className="text-gray-900 font-medium">{surveyData.spouseAge}</dd>
                </div>
              )}
            </dl>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Family</h3>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-gray-600">Children</dt>
                <dd className="text-gray-900 font-medium">{surveyData.hasChildren ? 'Yes' : 'No'}</dd>
              </div>
              {surveyData.hasChildren && (
                <>
                  <div>
                    <dt className="text-gray-600">Number of Children</dt>
                    <dd className="text-gray-900 font-medium">{surveyData.numberOfChildren}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Children Ages</dt>
                    <dd className="text-gray-900 font-medium">{surveyData.childrenAges.join(', ')}</dd>
                  </div>
                </>
              )}
            </dl>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Retirement Planning</h3>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-gray-600">Retirement Status</dt>
                <dd className="text-gray-900 font-medium">{surveyData.isRetired ? 'Retired' : 'Not Retired'}</dd>
              </div>
              {!surveyData.isRetired && (
                <div>
                  <dt className="text-gray-600">Years Until Retirement</dt>
                  <dd className="text-gray-900 font-medium">{surveyData.yearsUntilRetirement}</dd>
                </div>
              )}
              <div>
                <dt className="text-gray-600">Annual Contributions</dt>
                <dd className="text-gray-900 font-medium">${surveyData.retirementContributions.toLocaleString()}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Assets</h3>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-gray-600">Home Ownership</dt>
                <dd className="text-gray-900 font-medium">{surveyData.ownHome ? 'Yes' : 'No'}</dd>
              </div>
              {surveyData.ownHome && (
                <>
                  <div>
                    <dt className="text-gray-600">Home Value</dt>
                    <dd className="text-gray-900 font-medium">${surveyData.homeValue.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Mortgage Balance</dt>
                    <dd className="text-gray-900 font-medium">${surveyData.homeLoanAmount.toLocaleString()}</dd>
                  </div>
                </>
              )}
              <div>
                <dt className="text-gray-600">Emergency Savings</dt>
                <dd className="text-gray-900 font-medium">${surveyData.emergencySavings.toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}