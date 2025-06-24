import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../services/api';

// LoginScreen component - matches wireframe #1
const LoginScreen: React.FC = () => {
  // State hooks - these store data that can change
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hook for navigation between pages
  const navigate = useNavigate();

  // Function that runs when user submits the login form
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    setLoading(true);
    setError('');

    try {
      // Try to find the account
      await accountService.getAccountByNumber(accountNumber);
      // If successful, navigate to dashboard
      navigate(`/dashboard/${accountNumber}`);
    } catch (err) {
      // If account not found, show error
      setError('Account not found. Please check your account number.');
    } finally {
      setLoading(false);
    }
  };

  // Function that runs when user clicks "Create Account"
  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  // JSX - HTML-like syntax that defines what the component looks like
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Main login card with glassmorphism effect */}
        <div className="glass-container p-8 text-center">
          {/* Bank name header with handwritten font */}
          <h1 className="logo mb-2">
            Fast & Reckless Bank
          </h1>
          <p className="text-white mb-8 text-sm">Enter your account to continue</p>

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="accountNumber" className="form-label text-left">
                Account Number
              </label>
              <input
                id="accountNumber"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="ACC________________"
                className="form-input text-center font-mono tracking-wider"
                required
                disabled={loading}
              />
            </div>

            {/* Error message */}
            {error && <p className="form-error">{error}</p>}

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading || !accountNumber.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="loading-spinner mr-2"></div>
                    Checking...
                  </span>
                ) : (
                  'Access Account'
                )}
              </button>

              <button
                type="button"
                onClick={handleCreateAccount}
                className="btn-secondary"
                disabled={loading}
              >
                Create New Account
              </button>
            </div>
          </form>

          {/* Demo accounts section */}
          <div className="mt-8 p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl backdrop-blur-sm">
            <p className="text-sm text-purple-400 font-medium mb-3 flex items-center">
              <span className="mr-2">✨</span>
              Demo accounts available
            </p>
            <div className="space-y-2 text-sm text-white">
              <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded-lg">
                <span className="font-mono text-xs">ACC1234567890</span>
                <span className="text-white">John Doe</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded-lg">
                <span className="font-mono text-xs">ACC0987654321</span>
                <span className="text-white">Jane Smith</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
