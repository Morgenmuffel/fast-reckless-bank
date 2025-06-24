import React from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCard from './AccountCard';
import useAccounts from '../hooks/useAccounts';

// AccountList component - displays a list of all accounts
const AccountList: React.FC = () => {
  const { accounts, loading, error } = useAccounts();
  const navigate = useNavigate();

  const handleAccountClick = (accountNumber: string) => {
    navigate(`/dashboard/${accountNumber}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white">No accounts found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => (
        <AccountCard
          key={account.accountNumber}
          account={account}
          onClick={() => handleAccountClick(account.accountNumber)}
        />
      ))}
    </div>
  );
};

export default AccountList;
