import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { accountService } from '../services/api';
import { Account, TransactionType, TransactionRequest, TransferRequest } from '../types';

// TransactionForm component - handles deposit, withdraw, and transfer (wireframes #3, #4, #5)
const TransactionForm: React.FC = () => {
  const { accountNumber, type } = useParams<{ accountNumber: string; type: TransactionType }>();
  const navigate = useNavigate();

  // Form state
  const [account, setAccount] = useState<Account | null>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [toAccountNumber, setToAccountNumber] = useState('');
  const [toAccount, setToAccount] = useState<Account | null>(null);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Load account data on mount
  useEffect(() => {
    if (accountNumber) {
      loadAccountData();
    }
  }, [accountNumber]);

  // Load account data
  const loadAccountData = async () => {
    try {
      const accountData = await accountService.getAccountByNumber(accountNumber!);
      setAccount(accountData);
    } catch (err) {
      setError('Failed to load account data');
    }
  };

  // Verify destination account for transfers
  const handleVerifyAccount = async () => {
    if (!toAccountNumber.trim()) return;

    setVerifyingAccount(true);
    setError('');
    
    try {
      const destinationAccount = await accountService.getAccountByNumber(toAccountNumber);
      setToAccount(destinationAccount);
    } catch (err) {
      setError('Destination account not found');
      setToAccount(null);
    } finally {
      setVerifyingAccount(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const amountNum = parseFloat(amount);
      
      // Validate amount
      if (isNaN(amountNum) || amountNum <= 0) {
        throw new Error('Please enter a valid amount');
      }

      // Handle different transaction types
      if (type === 'deposit') {
        await accountService.deposit(accountNumber!, {
          amount: amountNum,
          description: description || 'Deposit'
        });
      } else if (type === 'withdraw') {
        if (account && amountNum > account.balance) {
          throw new Error('Insufficient funds');
        }
        await accountService.withdraw(accountNumber!, {
          amount: amountNum,
          description: description || 'Withdrawal'
        });
      } else if (type === 'transfer') {
        if (!toAccount) {
          throw new Error('Please verify the destination account first');
        }
        if (account && amountNum > account.balance) {
          throw new Error('Insufficient funds');
        }
        await accountService.transfer({
          fromAccountNumber: accountNumber!,
          toAccountNumber: toAccountNumber,
          amount: amountNum,
          description: description || 'Transfer'
        });
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    navigate(`/dashboard/${accountNumber}`);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Calculate new balance preview
  const getNewBalance = () => {
    if (!account || !amount) return account?.balance || 0;
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return account.balance;

    if (type === 'deposit') {
      return account.balance + amountNum;
    } else if (type === 'withdraw' || type === 'transfer') {
      return account.balance - amountNum;
    }
    return account.balance;
  };

  // Get transaction type display info
  const getTransactionInfo = () => {
    switch (type) {
      case 'deposit':
        return {
          title: 'DEPOSIT MONEY',
          icon: '+',
          buttonText: 'Deposit',
          buttonClass: 'btn-success'
        };
      case 'withdraw':
        return {
          title: 'WITHDRAW MONEY',
          icon: '-',
          buttonText: 'Withdraw',
          buttonClass: 'btn-danger'
        };
      case 'transfer':
        return {
          title: 'TRANSFER MONEY',
          icon: '⇄',
          buttonText: 'Transfer',
          buttonClass: 'btn-primary'
        };
      default:
        return {
          title: 'TRANSACTION',
          icon: '💰',
          buttonText: 'Submit',
          buttonClass: 'btn-primary'
        };
    }
  };

  const transactionInfo = getTransactionInfo();

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-md w-full mx-4">
          <div className="card text-center">
            <div className="text-6xl text-green-500 mb-4">✅</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Transaction Successful
            </h1>
            <p className="text-gray-600 mb-6">
              {type === 'deposit' && `Deposited ${formatCurrency(parseFloat(amount))} to your account`}
              {type === 'withdraw' && `Withdrew ${formatCurrency(parseFloat(amount))} from your account`}
              {type === 'transfer' && `Transferred ${formatCurrency(parseFloat(amount))} to ${toAccount?.ownerName}`}
            </p>
            {type !== 'transfer' && account && (
              <p className="text-lg font-medium text-gray-800 mb-6">
                New Balance: {formatCurrency(getNewBalance())}
              </p>
            )}
            <button onClick={handleBackToDashboard} className="btn-primary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="card">
          {/* Back button */}
          <div className="mb-6">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">{transactionInfo.icon}</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {transactionInfo.title}
            </h1>
          </div>

          {/* Current balance display */}
          {account && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 font-medium">
                Current Balance: {formatCurrency(account.balance)}
              </p>
            </div>
          )}

          {/* Transaction form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transfer destination field */}
            {type === 'transfer' && (
              <>
                <div>
                  <label className="form-label">From Account</label>
                  <div className="form-input bg-gray-50 text-gray-600">
                    {accountNumber} ({account?.ownerName})
                  </div>
                </div>

                <div>
                  <label htmlFor="toAccountNumber" className="form-label">
                    To Account Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="toAccountNumber"
                      type="text"
                      value={toAccountNumber}
                      onChange={(e) => {
                        setToAccountNumber(e.target.value);
                        setToAccount(null); // Reset verification
                      }}
                      placeholder="ACC________________"
                      className="form-input flex-1 font-mono"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyAccount}
                      disabled={!toAccountNumber.trim() || verifyingAccount}
                      className="btn-secondary whitespace-nowrap disabled:opacity-50"
                    >
                      {verifyingAccount ? 'Verifying...' : 'Verify'}
                    </button>
                  </div>
                </div>

                {/* Verified account display */}
                {toAccount && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center text-green-800">
                      <span className="text-lg mr-2">✅</span>
                      <span className="font-medium">Verified: {toAccount.ownerName}</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Amount field */}
            <div>
              <label htmlFor="amount" className="form-label">
                Amount (€)
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            {/* Description field */}
            <div>
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  type === 'deposit' ? 'e.g., Salary deposit' :
                  type === 'withdraw' ? 'e.g., ATM withdrawal' :
                  'e.g., Dinner payment'
                }
                className="form-input"
                disabled={loading}
              />
            </div>

            {/* Balance preview */}
            {amount && !isNaN(parseFloat(amount)) && type !== 'transfer' && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">After this transaction:</p>
                <p className="font-semibold text-gray-900">
                  New Balance: {formatCurrency(getNewBalance())}
                </p>
              </div>
            )}

            {/* Error message */}
            {error && <p className="form-error">{error}</p>}

            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleBackToDashboard}
                className="btn-secondary flex-1"
                disabled={loading}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={
                  loading || 
                  !amount || 
                  (type === 'transfer' && !toAccount)
                }
                className={`${transactionInfo.buttonClass} flex-1 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  `${transactionInfo.buttonText} ${amount ? formatCurrency(parseFloat(amount)) : ''}`
                )}
              </button>
            </div>
          </form>

          {/* Transfer fees info */}
          {type === 'transfer' && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">⚠️ Transfer fees: €0.00</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionForm; 