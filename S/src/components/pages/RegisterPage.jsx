import React from 'react';
import { Coins } from 'lucide-react';
import RegisterForm from '../auth/RegisterForm';

const RegisterPage = () => {
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
            <p>Join us for secure & cashless food ordering</p>
          </div>
          <div className="auth-body">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
