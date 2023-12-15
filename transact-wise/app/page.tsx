'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Accounts from './accounts/page';
import Transactions from './transactions/page';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('accounts');

  return (
    <div className="flex h-screen bg-gray-100">
      {sidebarOpen && (
        <div className="w-64 bg-gray-800">
          <Sidebar setCurrentPage={setCurrentPage} />
        </div>
      )}

      <div className="flex-grow">
        <div className="flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
        </div>
        <div className="p-4">
          {currentPage === 'accounts' ? <Accounts /> : <Transactions />}
        </div>
      </div>
    </div>
  );
}
