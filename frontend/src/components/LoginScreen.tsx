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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4">
        {/* Main login card */}
        <div className="card text-center">
          {/* Bank name header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            FAST & RECKLESS BANK
          </h1>
          <p className="text-gray-600 mb-8">Enter your account to continue</p>

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
                className="form-input text-center font-mono"
                required
                disabled={loading}
              />
            </div>

            {/* Error message */}
            {error && <p className="form-error">{error}</p>}

            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || !accountNumber.trim()}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Checking...
                  </span>
                ) : (
                  'Login'
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCreateAccount}
                className="btn-secondary flex-1"
                disabled={loading}
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Demo accounts section */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">💡 Demo accounts available:</p>
            <div className="space-y-1 text-sm text-blue-700">
              <p>ACC1234567890 (John Doe)</p>
              <p>ACC0987654321 (Jane Smith)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen; 