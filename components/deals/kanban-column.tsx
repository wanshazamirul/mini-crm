'use client';

import { Deal } from '@/lib/data';
import { DollarSign, Building2, Calendar } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface KanbanColumnProps {
  stage: { id: string; name: string; color: string };
  deals: Deal[];
  onEdit: (deal: Deal) => void;
}

export function KanbanColumn({ stage, deals, onEdit }: KanbanColumnProps) {
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div className={`${stage.color} rounded-lg p-4`}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{stage.name}</h3>
        <p className="text-xs text-gray-600 mt-1">
          {deals.length} {deals.length === 1 ? 'deal' : 'deals'}
        </p>
        {totalValue > 0 && (
          <p className="text-xs font-medium text-gray-900 mt-1">{formatCurrency(totalValue)}</p>
        )}
      </div>

      <div className="space-y-3">
        {deals.map((deal) => (
          <div
            key={deal.id}
            onClick={() => onEdit(deal)}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <h4 className="text-sm font-semibold text-gray-900 mb-2">{deal.name}</h4>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center">
                <Building2 className="w-3 h-3 mr-2 flex-shrink-0" />
                <span className="truncate">{deal.company}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="font-medium text-gray-900">{formatCurrency(deal.value)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-2 flex-shrink-0" />
                <span>{deal.expectedClose}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Probability</span>
                <span className="text-xs font-medium text-gray-900">{deal.probability}%</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-sfdc-blue-600 h-1.5 rounded-full"
                  style={{ width: `${deal.probability}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {deals.length === 0 && (
          <div className="text-center py-8 text-xs text-gray-500">
            No deals in this stage
          </div>
        )}
      </div>
    </div>
  );
}
