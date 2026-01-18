'use client';

import { useEffect, useState } from 'react';
import { SalesChart } from '@/components/reports/sales-chart';
import { DealTrendChart } from '@/components/reports/deal-trend-chart';
import { ContactStats } from '@/components/reports/contact-stats';
import { getDeals, type Deal } from '@/lib/data';

export default function ReportsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = getDeals();
      setDeals(data);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-sm text-gray-600 mt-1">Track your performance and insights.</p>
      </div>

      <ContactStats loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart deals={deals} loading={loading} />
        <DealTrendChart deals={deals} loading={loading} />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-900 mb-1">Average Deal Size</div>
            <div className="text-2xl font-bold text-blue-900">
              {deals.length > 0
                ? `$${Math.round(deals.reduce((sum, d) => sum + d.value, 0) / deals.length).toLocaleString()}`
                : '$0'}
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm font-medium text-green-900 mb-1">Win Rate</div>
            <div className="text-2xl font-bold text-green-900">
              {deals.length > 0
                ? `${Math.round((deals.filter((d) => d.stage === 'closed-won').length / deals.length) * 100)}%`
                : '0%'}
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm font-medium text-purple-900 mb-1">Active Opportunities</div>
            <div className="text-2xl font-bold text-purple-900">
              {deals.filter((d) => !d.stage.startsWith('closed-')).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
