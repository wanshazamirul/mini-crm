'use client';

import type { Deal } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

interface SalesChartProps {
  deals: Deal[];
  loading?: boolean;
}

export function SalesChart({ deals, loading }: SalesChartProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="flex-1 h-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const stages = [
    { id: 'prospecting', name: 'Prospecting', color: 'bg-gray-400' },
    { id: 'qualification', name: 'Qualification', color: 'bg-blue-400' },
    { id: 'proposal', name: 'Proposal', color: 'bg-yellow-400' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-400' },
    { id: 'closed-won', name: 'Closed Won', color: 'bg-green-500' },
    { id: 'closed-lost', name: 'Closed Lost', color: 'bg-red-400' },
  ];

  const stageData = stages.map((stage) => {
    const stageDeals = deals.filter((deal) => deal.stage === stage.id);
    const value = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
    return {
      ...stage,
      value,
      count: stageDeals.length,
    };
  });

  const maxValue = Math.max(...stageData.map((d) => d.value), 1);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Pipeline Value by Stage</h3>
      <div className="space-y-4">
        {stageData.map((stage) => (
          <div key={stage.id} className="flex items-center space-x-4">
            <div className="w-32 text-sm font-medium text-gray-700">{stage.name}</div>
            <div className="flex-1 flex items-center space-x-3">
              <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                <div
                  className={`${stage.color} h-full rounded-full flex items-center justify-end pr-2`}
                  style={{ width: `${(stage.value / maxValue) * 100}%` }}
                >
                  <span className="text-xs font-semibold text-white">{stage.count > 0 && `${stage.count}`}</span>
                </div>
              </div>
            </div>
            <div className="w-28 text-sm font-semibold text-gray-900 text-right">
              {stage.value > 0 ? formatCurrency(stage.value) : '-'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
