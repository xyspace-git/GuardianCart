import React from 'react';
import Logo from '../common/Logo';
import LoginForm from '../auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
      </div>
      
      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo-wrapper">
              <Logo size="large" />
            </div>
            <h1>Token Pay System</h1>
            <p>Secure & Cashless Food Ordering</p>
          </div>
          <div className="auth-body">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;