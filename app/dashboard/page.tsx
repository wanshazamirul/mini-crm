'use client';

import { useEffect, useState } from 'react';
import { getStats, getActivities, type Activity } from '@/lib/data';
import { StatCard } from '@/components/dashboard/stat-card';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    activeDeals: 0,
    pipelineValue: 0,
    wonDeals: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const statsData = getStats();
      setStats(statsData);
      setActivities(getActivities());
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Welcome back! Here's what's happening with your CRM.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Contacts"
          value={stats.totalContacts}
          change="+12%"
          trend="up"
          loading={loading}
        />
        <StatCard
          label="Active Deals"
          value={stats.activeDeals}
          change="+5%"
          trend="up"
          loading={loading}
        />
        <StatCard
          label="Pipeline Value"
          value={`$${(stats.pipelineValue / 1000).toFixed(0)}K`}
          change="+18%"
          trend="up"
          loading={loading}
        />
        <StatCard
          label="Won Deals"
          value={stats.wonDeals}
          change="+3%"
          trend="up"
          loading={loading}
        />
      </div>

      <RecentActivity activities={activities} loading={loading} />
    </div>
  );
}
