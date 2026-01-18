import { CheckCircle2, DollarSign, Mail, CheckSquare, UserPlus } from 'lucide-react';
import type { Activity } from '@/lib/types';

interface RecentActivityProps {
  activities: Activity[];
  loading?: boolean;
}

const activityIcons: Record<string, any> = {
  contact_created: UserPlus,
  deal_updated: DollarSign,
  deal_created: DollarSign,
  email_sent: Mail,
  task_completed: CheckSquare,
  contact_updated: CheckCircle2,
};

export function RecentActivity({ activities, loading }: RecentActivityProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-64"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type] || UserPlus;
          return (
            <div key={activity.id} className="px-6 py-4 flex items-start space-x-4">
              <div className="p-2 bg-sfdc-blue-50 rounded-full mt-1">
                <Icon className="w-4 h-4 text-sfdc-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.text}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
