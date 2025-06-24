import React from 'react';
import { Account } from '../types';

interface AccountCardProps {
  account: Account;
  onClick?: () => void;
}

// AccountCard component - displays account information in a card format
const AccountCard: React.FC<AccountCardProps> = ({ account, onClick }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div 
      className={`card hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{account.ownerName}</h3>
          <p className="text-sm text-gray-500 font-mono">{account.accountNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(account.balance)}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Created: {formatDate(account.createdAt)}</span>
        <span>{account.transactions.length} transactions</span>
      </div>
    </div>
  );
};

export default AccountCard; 