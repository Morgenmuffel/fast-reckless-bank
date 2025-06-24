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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
        {/* Background pattern overlay */}
        <div
          className="fixed inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>

        {/* Routes define which component to show for each URL */}
        <div className="relative z-10">
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
      </div>
    </Router>
  );
}

export default App;
