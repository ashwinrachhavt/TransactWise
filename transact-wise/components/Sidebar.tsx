"use client";

type SetCurrentPageType = (page: 'accounts' | 'transactions') => void;

type SidebarProps = {
    setCurrentPage: SetCurrentPageType;
  };

  const Sidebar = ({ setCurrentPage }: SidebarProps) => {    return (
      <nav className="text-white">
        <ul>
          <li className="p-2 hover:bg-gray-700" onClick={() => setCurrentPage('accounts')}>
            Accounts
          </li>
          <li className="p-2 hover:bg-gray-700" onClick={() => setCurrentPage('transactions')}>
            Transactions
          </li>
        </ul>
      </nav>
    );
  };
  

export default Sidebar;
