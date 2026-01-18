'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Mail, Building, Phone, Plus, Edit, Trash2 } from 'lucide-react';
import { getContacts, deleteContact, type Contact } from '@/lib/data';
import { ContactModal } from '@/components/contacts/contact-modal';

export function ContactList() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const data = getContacts();
      setContacts(data);
      setFilteredContacts(data);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(query) ||
          contact.lastName.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.company?.toLowerCase().includes(query)
      );
      setFilteredContacts(filtered);
    }
  }, [searchQuery, contacts]);

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
      setContacts(getContacts());
    }
  };

  const handleSave = () => {
    setContacts(getContacts());
    setModalOpen(false);
    setEditingContact(null);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your contacts and relationships.</p>
        </div>
        <button
          onClick={() => {
            setEditingContact(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-sfdc-blue-600 text-white rounded-md text-sm font-medium hover:bg-sfdc-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Contact
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sfdc-blue-600 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  onClick={() => router.push(`/contacts/${contact.id}`)}
                  className="flex items-center space-x-4 flex-1 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-sfdc-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
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
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-sfdc-blue-600 transition-colors">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {contact.company || 'No company'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="p-2 text-gray-600 hover:text-sfdc-blue-600 hover:bg-blue-50 rounded-md"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {contact.email && (
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{contact.phone}</span>
                  </div>
                )}
                {contact.company && (
                  <div className="flex items-center text-gray-600">
                    <Building className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{contact.company}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(contact.status)}`}>
                  {contact.status}
                </span>
                <span className="text-xs text-gray-500">
                  Updated {contact.lastUpdated}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {!loading && filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No contacts found matching "{searchQuery}"</p>
        </div>
      )}

      {modalOpen && (
        <ContactModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingContact(null);
          }}
          contact={editingContact}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
