import { useState, useEffect } from 'react';
import { accountService } from '../services/api';
import { Account } from '../types';

// Custom hook for managing account data
// This demonstrates React's hook pattern for reusable logic
export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all accounts
  const loadAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await accountService.getAllAccounts();
      setAccounts(data);
    } catch (err) {
      setError('Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  // Load accounts on mount
  useEffect(() => {
    loadAccounts();
  }, []);

  // Refresh accounts data
  const refreshAccounts = () => {
    loadAccounts();
  };

  return {
    accounts,
    loading,
    error,
    refreshAccounts
  };
};

export default useAccounts; 