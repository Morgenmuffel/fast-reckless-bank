import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import CreateAccount from './components/CreateAccount';
import './index.css';

// This is the main App component - the root of our application
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Routes define which component to show for each URL */}
        <Routes>
          {/* When user visits "/", redirect them to "/login" */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Login screen - matches wireframe #1 */}
          <Route path="/login" element={<LoginScreen />} />
          
          {/* Create new account - matches wireframe #9 */}
          <Route path="/create-account" element={<CreateAccount />} />
          
          {/* Account dashboard - matches wireframe #2 */}
          <Route path="/dashboard/:accountNumber" element={<Dashboard />} />
          
          {/* Transaction forms - matches wireframes #3, #4 */}
          <Route path="/transaction/:accountNumber/:type" element={<TransactionForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 