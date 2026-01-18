'use client';

import { Contact, getContacts, getDeals } from '@/lib/data';
import { Users, Building2, TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ContactStatsProps {
  loading?: boolean;
}

export function ContactStats({ loading }: ContactStatsProps) {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalCompanies: 0,
    totalDeals: 0,
    totalPipeline: 0,
  });

  useEffect(() => {
    const contacts = getContacts();
    const deals = getDeals();
    const companies = new Set(contacts.map((c) => c.company).filter(Boolean));

    setStats({
      totalContacts: contacts.length,
      totalCompanies: companies.size,
      totalDeals: deals.length,
      totalPipeline: deals.reduce((sum, deal) => sum + deal.value, 0),
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
            <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Contacts',
      value: stats.totalContacts,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Companies',
      value: stats.totalCompanies,
      icon: Building2,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Active Deals',
      value: stats.totalDeals,
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Total Pipeline',
      value: formatCurrency(stats.totalPipeline),
      icon: DollarSign,
      color: 'bg-yellow-50 text-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
