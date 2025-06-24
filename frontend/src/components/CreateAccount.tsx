import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../services/api';

// CreateAccount component - matches wireframe #9
const CreateAccount: React.FC = () => {
  const [ownerName, setOwnerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Function to handle account creation
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create new account via API
      const newAccount = await accountService.createAccount(ownerName);
      // Navigate to the new account's dashboard
      navigate(`/dashboard/${newAccount.accountNumber}`);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to go back to login
  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="logo mb-4">Fast & Reckless Bank</h1>
          <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
          <p className="text-white">Join the future of banking</p>
        </div>

        {/* Info Card */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">What you'll get:</h3>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-white">
              <span className="mr-3 text-purple-400">🎯</span>
              Your account number will be generated automatically
            </div>
            <div className="flex items-center text-sm text-white">
              <span className="mr-3 text-emerald-400">💎</span>
              Starting balance: €0.00
            </div>
            <div className="flex items-center text-sm text-white">
              <span className="mr-3 text-blue-400">⚡</span>
              All transactions tracked in real-time
            </div>
            <div className="flex items-center text-sm text-white">
              <span className="mr-3 text-pink-400">🔒</span>
              Secure & encrypted by default
            </div>
          </div>
        </div>

        {/* Create Account Form */}
        <div className="card">
          <form onSubmit={handleCreateAccount} className="space-y-6">
            <div>
              <label htmlFor="ownerName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="form-input"
                placeholder="Enter your full name"
                required
                disabled={loading}
                minLength={2}
              />
            </div>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !ownerName.trim()}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleBackToLogin}
              className="text-white hover:text-purple-400 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white">
            🔐 Your data is protected with bank-grade encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
