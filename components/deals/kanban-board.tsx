'use client';

import { useEffect, useState } from 'react';
import { Deal } from '@/lib/data';
import { KanbanColumn } from './kanban-column';
import { DealModal } from './deal-modal';

export function KanbanBoard() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  const stages = [
    { id: 'prospecting', name: 'Prospecting', color: 'bg-gray-100' },
    { id: 'qualification', name: 'Qualification', color: 'bg-blue-50' },
    { id: 'proposal', name: 'Proposal', color: 'bg-yellow-50' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-50' },
    { id: 'closed-won', name: 'Closed Won', color: 'bg-green-50' },
    { id: 'closed-lost', name: 'Closed Lost', color: 'bg-red-50' },
  ];

  useEffect(() => {
    setTimeout(() => {
      const data = Deal.getDeals();
      setDeals(data);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (deal: Deal) => {
    setEditingDeal(deal);
    setModalOpen(true);
  };

  const handleSave = () => {
    setDeals(Deal.getDeals());
    setModalOpen(false);
    setEditingDeal(null);
  };

  const getDealsByStage = (stageId: string) => {
    return deals.filter((deal) => deal.stage === stageId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals Pipeline</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage your sales pipeline.</p>
        </div>
        <button
          onClick={() => {
            setEditingDeal(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-sfdc-blue-600 text-white rounded-md text-sm font-medium hover:bg-sfdc-blue-700"
        >
          New Deal
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stages.map((stage) => (
            <div key={stage.id} className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="space-y-3">
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stages.map((stage) => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              deals={getDealsByStage(stage.id)}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {modalOpen && (
        <DealModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingDeal(null);
          }}
          deal={editingDeal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
