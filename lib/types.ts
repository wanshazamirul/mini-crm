export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'lead' | 'prospect' | 'customer' | 'churned';
  avatar?: string;
  createdAt: string;
  lastUpdated: string;
}

export interface Deal {
  id: string;
  name: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  contactId: string;
  company: string;
  expectedClose: string;
  probability: number;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: string;
  text: string;
  time: string;
}

export interface StatCard {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
}

export interface UserSettings {
  theme: 'light' | 'dark';
  companyName: string;
  notifications: boolean;
  emailAlerts: boolean;
  currency: 'USD' | 'EUR' | 'GBP';
  language: 'en' | 'es' | 'fr';
}
