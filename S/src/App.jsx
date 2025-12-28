import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import { ToastProvider } from './components/context/ToastContext';
import Toast from './components/common/Toast';
import LoadingSpinner from './components/common/LoadingSpinner';
import CustomerDashboard from './components/pages/CustomerDashboard';
import SellerDashboard from './components/pages/SellerDashboard';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height:  '100vh',
        background:  'var(--gray-50)'
      }}>
        <LoadingSpinner size={50} />
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user. role !== allowedRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  
  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent:  'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <LoadingSpinner size={50} color="white" />
      </div>
    );
  }
  
  if (user) return <Navigate to={`/${user.role}/dashboard`} replace />;
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/customer/dashboard" 
        element={
          <ProtectedRoute allowedRole="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/seller/dashboard" 
        element={
          <ProtectedRoute allowedRole="seller">
            <SellerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AppRoutes />
          <Toast />
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;