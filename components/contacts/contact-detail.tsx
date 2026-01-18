'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, Building, MapPin, Globe, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { getContactById, updateContact, deleteContact, type Contact } from '@/lib/data';

export function ContactDetail({ contactId }: { contactId: string }) {
  const router = useRouter();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    status: 'lead' as Contact['status'],
  });

  useEffect(() => {
    setTimeout(() => {
      const data = getContactById(contactId);
      setContact(data || null);
      if (data) {
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || '',
          company: data.company || '',
          status: data.status,
        });
      }
      setLoading(false);
    }, 800);
  }, [contactId]);

  const handleSave = () => {
    if (contact) {
      updateContact(contact.id, formData);
      setContact({ ...contact, ...formData });
      setEditing(false);
    }
  };

  const handleDelete = () => {
    if (contact && confirm('Are you sure you want to delete this contact?')) {
      deleteContact(contact.id);
      router.push('/contacts');
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      lead: 'bg-blue-100 text-blue-800',
      prospect: 'bg-yellow-100 text-yellow-800',
      customer: 'bg-green-100 text-green-800',
      churned: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.lead;
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-40"></div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-32"></div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-32"></div>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact Not Found</h2>
        <p className="text-gray-600 mb-4">The contact you're looking for doesn't exist.</p>
        <button
          onClick={() => router.push('/contacts')}
          className="px-4 py-2 bg-sfdc-blue-600 text-white rounded-md hover:bg-sfdc-blue-700"
        >
          Back to Contacts
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push('/contacts')}
        className="flex items-center text-sfdc-blue-600 hover:text-sfdc-blue-700 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Contacts
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-sfdc-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {contact.avatar ? (
                <img
                  src={contact.avatar}
                  alt={`${contact.firstName} ${contact.lastName}`}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                `${contact.firstName[0]}${contact.lastName[0]}`
              )}
            </div>
            <div>
              {editing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="text-2xl font-bold text-gray-900 border border-gray-300 rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="text-xl text-gray-600 border border-gray-300 rounded px-2 py-1"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {contact.firstName} {contact.lastName}
                  </h1>
                  <p className="text-gray-600">{contact.company || 'No company'}</p>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!editing && (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-sfdc-blue-600 text-white rounded-md text-sm font-medium hover:bg-sfdc-blue-700 flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </>
            )}
            {editing && (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      firstName: contact.firstName,
                      lastName: contact.lastName,
                      email: contact.email,
                      phone: contact.phone || '',
                      company: contact.company || '',
                      status: contact.status,
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {editing && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Contact['status'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="lead">Lead</option>
                <option value="prospect">Prospect</option>
                <option value="customer">Customer</option>
                <option value="churned">Churned</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}

        {!editing && (
          <div className="flex items-center space-x-2 mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(contact.status)}`}>
              {contact.status}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <dl className="space-y-4">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-400 mr-3 mt-1" />
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{contact.email}</dd>
              </div>
            </div>
            {contact.phone && (
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                <div className="flex-1">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{contact.phone}</dd>
                </div>
              </div>
            )}
          </dl>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
          <dl className="space-y-4">
            {contact.company && (
              <div className="flex items-start">
                <Building className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                <div className="flex-1">
                  <dt className="text-sm font-medium text-gray-500">Company</dt>
                  <dd className="mt-1 text-sm text-gray-900">{contact.company}</dd>
                </div>
              </div>
            )}
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900">Not provided</dd>
              </div>
            </div>
            <div className="flex items-start">
              <Globe className="w-5 h-5 text-gray-400 mr-3 mt-1" />
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500">Website</dt>
                <dd className="mt-1 text-sm text-gray-900">Not provided</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(contact.status)}`}>
                {contact.status}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="mt-1 text-sm text-gray-900">{contact.createdAt}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
            <dd className="mt-1 text-sm text-gray-900">{contact.lastUpdated}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
