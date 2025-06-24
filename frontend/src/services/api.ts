import axios from 'axios';
import { Account, TransactionRequest, TransferRequest } from '../types';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Your Spring Boot backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions - these make HTTP requests to your backend
export const accountService = {
  // Get all accounts
  getAllAccounts: async (): Promise<Account[]> => {
    const response = await api.get('/accounts');
    return response.data;
  },

  // Find account by account number
  getAccountByNumber: async (accountNumber: string): Promise<Account> => {
    const accounts = await accountService.getAllAccounts();
    const account = accounts.find(acc => acc.accountNumber === accountNumber);
    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  },

  // Create new account
  createAccount: async (ownerName: string): Promise<Account> => {
    const response = await api.post('/accounts', { ownerName });
    return response.data;
  },

  // Deposit money
  deposit: async (accountNumber: string, request: TransactionRequest): Promise<Account> => {
    const response = await api.post(`/accounts/${accountNumber}/deposit`, request);
    return response.data;
  },

  // Withdraw money
  withdraw: async (accountNumber: string, request: TransactionRequest): Promise<Account> => {
    const response = await api.post(`/accounts/${accountNumber}/withdraw`, request);
    return response.data;
  },

  // Transfer money between accounts
  transfer: async (request: TransferRequest): Promise<void> => {
    await api.post('/accounts/transfer', request);
  },
};

export default api; 