import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { accountService } from '../services/api';
import { Account, Transaction } from '../types';

// Dashboard component - matches wireframe #2
const Dashboard: React.FC = () => {
  // Get account number from URL parameters
  const { accountNumber } = useParams<{ accountNumber: string }>();
  const navigate = useNavigate();
  
  // Component state
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load account data when component mounts
  useEffect(() => {
    if (accountNumber) {
      loadAccountData();
    }
  }, [accountNumber]);

  // Function to load account data from API
  const loadAccountData = async () => {
    try {
      setLoading(true);
      const accountData = await accountService.getAccountByNumber(accountNumber!);
      setAccount(accountData);
    } catch (err) {
      setError('Failed to load account data');
    } finally {
      setLoading(false);
    }
  };

  // Navigation functions for action buttons
  const handleDeposit = () => {
    navigate(`/transaction/${accountNumber}/deposit`);
  };

  const handleWithdraw = () => {
    navigate(`/transaction/${accountNumber}/withdraw`);
  };

  const handleTransfer = () => {
    navigate(`/transaction/${accountNumber}/transfer`);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // Format currency display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Format date display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !account) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Account not found'}</p>
          <button onClick={handleLogout} className="btn-primary">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Welcome, {account.ownerName}
            </h1>
            <p className="text-sm text-gray-600">Account: {account.accountNumber}</p>
          </div>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Balance card */}
        <div className="card mb-8 text-center">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-600 mb-2">CURRENT BALANCE</h2>
            <div className="balance-display">
              {formatCurrency(account.balance)}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Account created: {formatDate(account.createdAt)}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={handleDeposit}
            className="card text-center hover:shadow-md transition-shadow p-6"
          >
            <div className="text-3xl mb-2">+</div>
            <h3 className="font-semibold text-gray-900">Deposit</h3>
            <p className="text-sm text-gray-600">Add money</p>
          </button>

          <button
            onClick={handleWithdraw}
            className="card text-center hover:shadow-md transition-shadow p-6"
          >
            <div className="text-3xl mb-2">-</div>
            <h3 className="font-semibold text-gray-900">Withdraw</h3>
            <p className="text-sm text-gray-600">Take money out</p>
          </button>

          <button
            onClick={handleTransfer}
            className="card text-center hover:shadow-md transition-shadow p-6 col-span-2 md:col-span-1"
          >
            <div className="text-3xl mb-2">⇄</div>
            <h3 className="font-semibold text-gray-900">Transfer</h3>
            <p className="text-sm text-gray-600">Send to another account</p>
          </button>
        </div>

        {/* Recent transactions */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-bold text-gray-900">RECENT TRANSACTIONS</h2>
          </div>

          {account.transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No transactions yet</p>
              <p className="text-sm text-gray-400 mt-2">
                Start by making a deposit or transfer
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {account.transactions
                .slice(-5) // Show last 5 transactions
                .reverse() // Show newest first
                .map((transaction: Transaction) => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">
                          {transaction.type === 'DEPOSIT' ? '💰' : 
                           transaction.type === 'WITHDRAW' ? '💸' : '⇄'}
                        </span>
                        <h4 className="font-medium text-gray-900">
                          {transaction.description}
                        </h4>
                        {transaction.category && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            🏷️{transaction.category}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {formatDate(transaction.timestamp)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`font-semibold ${
                        transaction.type === 'DEPOSIT' 
                          ? 'transaction-positive' 
                          : 'transaction-negative'
                      }`}>
                        {transaction.type === 'DEPOSIT' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              
              {account.transactions.length > 5 && (
                <div className="pt-4 text-center">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All Transactions
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 