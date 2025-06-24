// TypeScript types - these define the shape of our data
// They help prevent bugs by checking data types at compile time

export interface Transaction {
  id: string;
  accountNumber: string;
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER';
  amount: number;
  description: string;
  timestamp: string;
  category?: string; // For future AI categorization
}

export interface Account {
  accountNumber: string;
  ownerName: string;
  balance: number;
  createdAt: string;
  transactions: Transaction[];
}

// Request types for API calls
export interface TransactionRequest {
  amount: number;
  description: string;
}

export interface TransferRequest {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  description: string;
}

// UI State types
export interface FormError {
  field: string;
  message: string;
}

export type TransactionType = 'deposit' | 'withdraw' | 'transfer'; 