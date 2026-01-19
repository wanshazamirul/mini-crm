'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { createDeal, updateDeal, getContacts, type Deal } from '@/lib/data';

interface DealModalProps {
  open: boolean;
  onClose: () => void;
  deal: Deal | null;
  onSave: () => void;
}

export function DealModal({ open, onClose, deal, onSave }: DealModalProps) {
  const router = useRouter();
  const isEditing = Boolean(deal);
  const contacts = getContacts();

  const [formData, setFormData] = useState({
    name: '',
    value: '',
    stage: 'prospecting' as Deal['stage'],
    contactId: '',
    company: '',
    expectedClose: '',
    probability: '50',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (deal) {
      setFormData({
        name: deal.name,
        value: deal.value.toString(),
        stage: deal.stage,
        contactId: deal.contactId,
        company: deal.company,
        expectedClose: deal.expectedClose,
        probability: deal.probability.toString(),
      });
    }
  }, [deal]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Deal name is required';
    }

    if (!formData.value || isNaN(Number(formData.value)) || Number(formData.value) <= 0) {
      newErrors.value = 'Please enter a valid value';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.expectedClose) {
      newErrors.expectedClose = 'Expected close date is required';
    }

    if (
      !formData.probability ||
      isNaN(Number(formData.probability)) ||
      Number(formData.probability) < 0 ||
      Number(formData.probability) > 100
    ) {
      newErrors.probability = 'Probability must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    setTimeout(() => {
      const dealData = {
        name: formData.name,
        value: Number(formData.value),
        stage: formData.stage,
        contactId: formData.contactId,
        company: formData.company,
        expectedClose: formData.expectedClose,
        probability: Number(formData.probability),
      };

      if (isEditing && deal) {
        updateDeal(deal.id, dealData);
      } else {
        const newDeal = createDeal(dealData);
      }

      setSubmitting(false);
      onSave();
      onClose();
      resetForm();
    }, 500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      value: '',
      stage: 'prospecting',
      contactId: '',
      company: '',
      expectedClose: '',
      probability: '50',
    });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Edit Deal' : 'Add New Deal'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Deal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sfdc-blue-600 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enterprise Software License"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                  Value ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sfdc-blue-600 ${
                    errors.value ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="50000"
                />
                {errors.value && <p className="mt-1 text-sm text-red-600">{errors.value}</p>}
              </div>

              <div>
                <label htmlFor="probability" className="block text-sm font-medium text-gray-700 mb-1">
                  Probability (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="probability"
                  name="probability"
                  value={formData.probability}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sfdc-blue-600 ${
                    errors.probability ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="50"
                />
                {errors.probability && <p className="mt-1 text-sm text-red-600">{errors.probability}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sfdc-blue-600 ${
                  errors.company ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Acme Inc."
              />
              {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
            </div>

            <div>
              <label htmlFor="contactId" className="block text-sm font-medium text-gray-700 mb-1">
                Primary Contact
              </label>
              <select
                id="contactId"
                name="contactId"
                value={formData.contactId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sfdc-blue-600"
              >
                <option value="">Select a contact</option>
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.firstName} {contact.lastName} - {contact.company}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
                  Stage
                </label>
                <select
                  id="stage"
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sfdc-blue-600"
                >
                  <option value="prospecting">Prospecting</option>
                  <option value="qualification">Qualification</option>
                  <option value="proposal">Proposal</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="closed-won">Closed Won</option>
                  <option value="closed-lost">Closed Lost</option>
                </select>
              </div>

              <div>
                <label htmlFor="expectedClose" className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Close <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="expectedClose"
                  name="expectedClose"
                  value={formData.expectedClose}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sfdc-blue-600 ${
                    errors.expectedClose ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.expectedClose && <p className="mt-1 text-sm text-red-600">{errors.expectedClose}</p>}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-sfdc-blue-600 text-white rounded-md text-sm font-medium hover:bg-sfdc-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow transition-all font-semibold"
            >
              {submitting ? 'Saving...' : isEditing ? 'Update' : 'Create Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
