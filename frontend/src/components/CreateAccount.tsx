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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4">
        <div className="card">
          {/* Back button */}
          <div className="mb-6">
            <button
              onClick={handleBackToLogin}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Login
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              CREATE NEW ACCOUNT
            </h1>
            <p className="text-gray-600">Start your banking journey with us</p>
          </div>

          {/* Create account form */}
          <form onSubmit={handleCreateAccount} className="space-y-6">
            <div>
              <label htmlFor="ownerName" className="form-label">
                Account Holder Name
              </label>
              <input
                id="ownerName"
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Enter your full name"
                className="form-input"
                required
                disabled={loading}
                minLength={2}
              />
            </div>

            {/* Error message */}
            {error && <p className="form-error">{error}</p>}

            {/* Information section */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <span className="mr-2">📝</span>
                Your account number will be generated automatically
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="mr-2">💰</span>
                Starting balance: €0.00
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="mr-2">⚡</span>
                All transactions will be tracked instantly
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="btn-secondary flex-1"
                disabled={loading}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading || !ownerName.trim()}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Creating...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount; 