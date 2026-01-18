'use client';

import type { Deal } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

interface DealTrendChartProps {
  deals: Deal[];
  loading?: boolean;
}

export function DealTrendChart({ deals, loading }: DealTrendChartProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  // Simulate monthly data (in real app, this would come from actual data)
  const monthlyData = [
    { month: 'Jan', value: 125000, deals: 8 },
    { month: 'Feb', value: 98000, deals: 6 },
    { month: 'Mar', value: 156000, deals: 10 },
    { month: 'Apr', value: 142000, deals: 9 },
    { month: 'May', value: 189000, deals: 12 },
    { month: 'Jun', value: 210000, deals: 14 },
  ];

  const maxValue = Math.max(...monthlyData.map((d) => d.value));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trend (6 Months)</h3>
      <div className="flex items-end space-x-2 h-64">
        {monthlyData.map((data) => (
          <div key={data.month} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center justify-end flex-1">
              <div className="w-full bg-sfdc-blue-50 rounded-t-lg relative flex-1 flex items-end overflow-hidden">
                <div
                  className="w-full bg-sfdc-blue-600 hover:bg-sfdc-blue-700 transition-colors"
                  style={{ height: `${(data.value / maxValue) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                    {formatCurrency(data.value)}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 text-sm font-medium text-gray-600">{data.month}</div>
            <div className="text-xs text-gray-500">{data.deals} deals</div>
          </div>
        ))}
      </div>
    </div>
  );
}
