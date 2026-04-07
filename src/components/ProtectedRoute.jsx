import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Loading...</div>; // Prevent flash of redirect
  }

  // If no user is logged in, forcefully redirect to login
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;
