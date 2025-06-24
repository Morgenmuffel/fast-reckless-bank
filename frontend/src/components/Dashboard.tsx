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
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-white">Loading your account...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !account) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Account not found'}</p>
          <button onClick={handleLogout} className="btn-primary">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-container m-4 mb-0 border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-100 mb-1">
              Welcome back, {account.ownerName}
            </h1>
            <p className="text-sm text-gray-400 font-mono">
              {account.accountNumber}
            </p>
          </div>
          <button onClick={handleLogout} className="btn-secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Balance card */}
        <div className="card mb-8 text-center neon-glow">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-400 mb-4 tracking-wider uppercase">Current Balance</h2>
            <div className="balance-display mb-2">
              {formatCurrency(account.balance)}
            </div>
            <div className="flex items-center justify-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${account.balance >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-400">
                Account created {formatDate(account.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={handleDeposit}
            className="card text-center account-card-hover p-8 group"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-100 mb-1">Deposit</h3>
            <p className="text-sm text-gray-400">Add money to account</p>
          </button>

          <button
            onClick={handleWithdraw}
            className="card text-center account-card-hover p-8 group"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-100 mb-1">Withdraw</h3>
            <p className="text-sm text-gray-400">Take money out</p>
          </button>

          <button
            onClick={handleTransfer}
            className="card text-center account-card-hover p-8 col-span-2 md:col-span-1 group"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-100 mb-1">Transfer</h3>
            <p className="text-sm text-gray-400">Send to another account</p>
          </button>
        </div>

        {/* Recent transactions */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-bold gradient-text">Recent Transactions</h2>
          </div>

          {account.transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-800/50 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg mb-2">No transactions yet</p>
              <p className="text-sm text-gray-500">
                Start by making a deposit or transfer
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {account.transactions
                .slice(-5) // Show last 5 transactions
                .reverse() // Show newest first
                .map((transaction: Transaction) => (
                  <div key={transaction.id} className="transaction-item flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                        transaction.type === 'DEPOSIT'
                          ? 'bg-emerald-500/20 border border-emerald-500/30'
                          : transaction.type === 'WITHDRAW'
                          ? 'bg-red-500/20 border border-red-500/30'
                          : 'bg-purple-500/20 border border-purple-500/30'
                      }`}>
                        {transaction.type === 'DEPOSIT' ? (
                          <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        ) : transaction.type === 'WITHDRAW' ? (
                          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-100">
                            {transaction.description}
                          </h4>
                          {transaction.category && (
                            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-lg border border-purple-500/30">
                              {transaction.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">
                          {formatDate(transaction.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`font-semibold text-lg ${
                        transaction.type === 'DEPOSIT'
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}>
                        {transaction.type === 'DEPOSIT' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  </div>
                ))}

              {account.transactions.length > 5 && (
                <div className="pt-6 text-center border-t border-gray-800/50">
                  <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center mx-auto group">
                    View All Transactions
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
