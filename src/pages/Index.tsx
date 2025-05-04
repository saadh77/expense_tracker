
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import AppLayout from '@/components/layout/AppLayout';
import Dashboard from './Dashboard';
import Transactions from './Transactions';
import Analytics from './Analytics';
import Settings from './Settings';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const handleAuthenticated = (userData: { email: string }) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 p-4">
        <div className="w-full max-w-md">
          <AuthForm onAuthenticated={handleAuthenticated} />
        </div>
      </div>
    );
  }

  return (
    <AppLayout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
};

export default Index;
