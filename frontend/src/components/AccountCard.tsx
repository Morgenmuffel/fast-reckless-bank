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
      className={`card account-card-hover ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-1">{account.ownerName}</h3>
          <p className="text-sm text-white font-mono tracking-wider bg-gray-800/50 px-3 py-1 rounded-lg inline-block">
            {account.accountNumber}
          </p>
        </div>
        <div className="text-right">
          <p className="balance-display mb-1">
            {formatCurrency(account.balance)}
          </p>
          <div className="flex items-center justify-end">
            <div className={`w-2 h-2 rounded-full mr-2 ${account.balance >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-white">
              {account.balance >= 0 ? 'Active' : 'Overdrawn'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Created {formatDate(account.createdAt)}</span>
        </div>
        <div className="flex items-center text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
            {account.transactions.length} transactions
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
