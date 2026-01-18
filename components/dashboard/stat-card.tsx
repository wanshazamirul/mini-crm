interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  loading?: boolean;
}

export function StatCard({ label, value, change, trend, loading }: StatCardProps) {
  if (loading) {
    return <StatCardSkeleton />;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-sfdc-blue-50 rounded-lg">
          <div className="w-6 h-6 bg-sfdc-blue-600 rounded-full"></div>
        </div>
        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-24"></div>
      <div className="mt-4 flex items-center space-x-2">
        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
        <div className="h-3 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
}
