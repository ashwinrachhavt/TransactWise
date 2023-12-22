'use client';


import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Accounts from '@/components/Accounts';
import Transactions from '@/components/Transactions';
import { UserButton } from "@clerk/nextjs";

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
        <div className="p-4">
          {currentPage === 'accounts' ? <Accounts /> : <Transactions />}
        </div>
      <div className="flex-grow">
        <div className="flex justify-end p-4">
          <div className="h-screen">
            <UserButton afterSignOutUrl="/"/>
          </div>
        </div>

      </div>
    </div>
  );
}
