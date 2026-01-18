'use client';

import { Search, Bell, Plus, LogOut } from 'lucide-react';
import Link from 'next/link';

export function TopNav() {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts, deals..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sfdc-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-md">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <Link
          href="/contacts/new"
          className="px-4 py-2 bg-sfdc-blue-600 text-white rounded-md text-sm font-medium hover:bg-sfdc-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Contact
        </Link>

        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-sfdc-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">John Doe</p>
            <p className="text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
