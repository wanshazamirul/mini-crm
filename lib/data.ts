import { Contact, Deal, Activity, UserSettings } from './types';

// Initial mock data
const initialContacts: Contact[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 555-0101',
    company: 'Tech Corp',
    status: 'customer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2025-12-15',
    lastUpdated: '2 days ago',
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@startup.io',
    phone: '+1 555-0102',
    company: 'Startup Inc',
    status: 'prospect',
    avatar: 'https://i.pravatar.cc/150?img=5',
    createdAt: '2025-12-10',
    lastUpdated: '1 day ago',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@globaltech.com',
    company: 'GlobalTech',
    status: 'lead',
    avatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: '2025-12-18',
    lastUpdated: '5 hours ago',
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.d@innovate.co',
    company: 'Innovate Co',
    status: 'customer',
    avatar: 'https://i.pravatar.cc/150?img=9',
    createdAt: '2025-11-20',
    lastUpdated: '1 week ago',
  },
];

const initialDeals: Deal[] = [
  {
    id: 'd1',
    name: 'Enterprise License Deal',
    value: 50000,
    stage: 'proposal',
    contactId: '1',
    company: 'Tech Corp',
    expectedClose: '2025-02-15',
    probability: 60,
    createdAt: '2025-12-01',
  },
  {
    id: 'd2',
    name: 'Annual Subscription',
    value: 12000,
    stage: 'negotiation',
    contactId: '2',
    company: 'Startup Inc',
    expectedClose: '2025-01-30',
    probability: 80,
    createdAt: '2025-12-05',
  },
  {
    id: 'd3',
    name: 'Consulting Services',
    value: 25000,
    stage: 'qualification',
    contactId: '3',
    company: 'GlobalTech',
    expectedClose: '2025-03-01',
    probability: 30,
    createdAt: '2025-12-10',
  },
];

const initialActivities: Activity[] = [
  { id: '1', type: 'contact_created', text: 'New contact added: John Smith', time: '2 min ago' },
  { id: '2', type: 'deal_updated', text: 'Deal moved to proposal: Enterprise License', time: '15 min ago' },
  { id: '3', type: 'email_sent', text: 'Email opened by Sarah Johnson', time: '1 hour ago' },
  { id: '4', type: 'task_completed', text: 'Follow-up call completed', time: '2 hours ago' },
];

const initialSettings: UserSettings = {
  theme: 'light',
  companyName: 'MiniCRM Inc',
  notifications: true,
  emailAlerts: true,
  currency: 'USD',
  language: 'en',
};

// LocalStorage keys
const CONTACTS_KEY = 'mini-crm-contacts';
const DEALS_KEY = 'mini-crm-deals';
const ACTIVITIES_KEY = 'mini-crm-activities';
const SETTINGS_KEY = 'mini-crm-settings';

// Initialize data
if (typeof window !== 'undefined') {
  if (!localStorage.getItem(CONTACTS_KEY)) {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(initialContacts));
  }
  if (!localStorage.getItem(DEALS_KEY)) {
    localStorage.setItem(DEALS_KEY, JSON.stringify(initialDeals));
  }
  if (!localStorage.getItem(ACTIVITIES_KEY)) {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(initialActivities));
  }
  if (!localStorage.getItem(SETTINGS_KEY)) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(initialSettings));
  }
}

// Contact functions
export function getContacts(): Contact[] {
  if (typeof window === 'undefined') return initialContacts;
  const data = localStorage.getItem(CONTACTS_KEY);
  return data ? JSON.parse(data) : initialContacts;
}

export function getContactById(id: string): Contact | undefined {
  const contacts = getContacts();
  return contacts.find(c => c.id === id);
}

export function createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'lastUpdated'>): Contact {
  const contacts = getContacts();
  const newContact: Contact = {
    ...contact,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
    lastUpdated: 'Just now',
  };
  contacts.unshift(newContact);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  addActivity({
    id: Date.now().toString(),
    type: 'contact_created',
    text: `New contact added: ${contact.firstName} ${contact.lastName}`,
    time: 'Just now',
  });
  return newContact;
}

export function updateContact(id: string, updates: Partial<Contact>): Contact | null {
  const contacts = getContacts();
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) return null;

  contacts[index] = { ...contacts[index], ...updates, lastUpdated: 'Just now' };
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  return contacts[index];
}

export function deleteContact(id: string): boolean {
  const contacts = getContacts();
  const filtered = contacts.filter(c => c.id !== id);
  if (filtered.length === contacts.length) return false;
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(filtered));
  return true;
}

// Deal functions
export function getDeals(): Deal[] {
  if (typeof window === 'undefined') return initialDeals;
  const data = localStorage.getItem(DEALS_KEY);
  return data ? JSON.parse(data) : initialDeals;
}

export function getDealById(id: string): Deal | undefined {
  const deals = getDeals();
  return deals.find(d => d.id === id);
}

export function createDeal(deal: Omit<Deal, 'id' | 'createdAt'>): Deal {
  const deals = getDeals();
  const newDeal: Deal = {
    ...deal,
    id: `d${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
  };
  deals.unshift(newDeal);
  localStorage.setItem(DEALS_KEY, JSON.stringify(deals));
  addActivity({
    id: Date.now().toString(),
    type: 'deal_created',
    text: `New deal created: ${deal.name}`,
    time: 'Just now',
  });
  return newDeal;
}

export function updateDeal(id: string, updates: Partial<Deal>): Deal | null {
  const deals = getDeals();
  const index = deals.findIndex(d => d.id === id);
  if (index === -1) return null;

  deals[index] = { ...deals[index], ...updates };
  localStorage.setItem(DEALS_KEY, JSON.stringify(deals));
  return deals[index];
}

export function deleteDeal(id: string): boolean {
  const deals = getDeals();
  const filtered = deals.filter(d => d.id !== id);
  if (filtered.length === deals.length) return false;
  localStorage.setItem(DEALS_KEY, JSON.stringify(filtered));
  return true;
}

// Activity functions
export function getActivities(): Activity[] {
  if (typeof window === 'undefined') return initialActivities;
  const data = localStorage.getItem(ACTIVITIES_KEY);
  return data ? JSON.parse(data) : initialActivities;
}

export function addActivity(activity: Activity): void {
  const activities = getActivities();
  activities.unshift(activity);
  if (activities.length > 20) activities.pop();
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
  }
}

// Settings functions
export function getSettings(): UserSettings {
  if (typeof window === 'undefined') return initialSettings;
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : initialSettings;
}

export function updateSettings(updates: Partial<UserSettings>): UserSettings {
  const settings = getSettings();
  const newSettings = { ...settings, ...updates };
  if (typeof window !== 'undefined') {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  }
  return newSettings;
}

// Stats
export function getStats() {
  const contacts = getContacts();
  const deals = getDeals();

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const closedWon = deals.filter(d => d.stage === 'closed-won').length;

  return {
    totalContacts: contacts.length,
    activeDeals: deals.filter(d => !d.stage.startsWith('closed-')).length,
    pipelineValue: totalValue,
    wonDeals: closedWon,
  };
}

// Re-export types
export type { Contact, Deal, Activity, UserSettings } from './types';
