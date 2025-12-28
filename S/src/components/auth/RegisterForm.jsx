// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, Info, Copy, CheckCircle } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import RoleSelector from './RoleSelector';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { authService } from '../services/authService';
import { validateEmail, validatePassword, validateName } from '../utils/validators';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [role, setRole] = useState('customer');
  const [formData, setFormData] = useState({
    name: '',
    email:  '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const demoCredentials = [
    { role: 'Customer', name: 'John Doe', email: 'customer@test.com', password: 'customer123' },
    { role:  'Seller', name: 'Jane Smith', email: 'seller@test.com', password: 'seller123' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setApiError('');
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: formData.password !== formData.confirmPassword ?  'Passwords do not match' : ''
    };
    setErrors(newErrors);
    return ! Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    console.log('Selected role:', role);
    
    if (!validateForm()) {
      console.log('Validation failed:', errors);
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const registerFn = role === 'customer'
        ? authService.registerCustomer
        :  authService.registerSeller;

      console.log('Calling registration function for role:', role);
      
      const result = await registerFn(formData.name, formData.email, formData.password);
      
      console.log('Registration result:', result);

      if (result.success) {
        login(result.user);
        addToast(`Welcome, ${result.user.name}! Your account has been created.`, 'success');
        navigate(role === 'customer' ? '/customer/dashboard' : '/seller/dashboard');
      } else {
        console.error('Registration failed:', result. error);
        setApiError(result. error);
        addToast(result.error, 'error');
      }
    } catch (error) {
      console.error('Registration exception:', error);
      setApiError('An error occurred.  Please try again.');
      addToast('An error occurred. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const copyCredentials = (index, cred) => {
    setFormData({
      name: cred.name,
      email: cred.email,
      password: cred.password,
      confirmPassword: cred. password
    });
    setRole(cred.role. toLowerCase());
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    addToast('Credentials copied!  Click Create Account to continue.', 'info');
  };

  return (
    <form onSubmit={handleSubmit}>
      <RoleSelector selectedRole={role} onRoleChange={setRole} />

      {apiError && (
        <div className="api-error">
          <AlertCircle size={20} />
          <span>{apiError}</span>
        </div>
      )}

      <Input
        label="Full Name"
        type="text"
        name="name"
        value={formData. name}
        onChange={handleChange}
        placeholder="Enter your full name"
        error={errors.name}
        icon={User}
        variant={role}
      />

      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        error={errors.email}
        icon={Mail}
        variant={role}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
        error={errors.password}
        icon={Lock}
        variant={role}
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData. confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
        error={errors.confirmPassword}
        icon={Lock}
        variant={role}
      />

      <Button
        type="submit"
        variant={role}
        loading={isLoading}
        fullWidth
      >
        Create {role === 'customer' ? 'Customer' : 'Seller'} Account
      </Button>

      <div className="divider">
        <span>or</span>
      </div>

      <div className="social-login">
        <button type="button" className="social-btn">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-. 26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button type="button" className="social-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
      </div>

      <div className="auth-footer">
        <p>Already have an account?  <a href="/login">Sign In</a></p>
      </div>

      <div className="demo-credentials">
        <h4>
          <Info size={16} />
          Demo Credentials
        </h4>
        {demoCredentials.map((cred, index) => (
          <div key={index} className="demo-item">
            <span className="role">{cred. role}</span>
            <span className="creds">{cred.email}</span>
            <button
              type="button"
              className="copy-btn"
              onClick={() => copyCredentials(index, cred)}
            >
              {copiedIndex === index ? (
                <CheckCircle size={14} color="#10b981" />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
        ))}
      </div>
    </form>
  );
};

export default RegisterForm;