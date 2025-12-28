import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  variant = 'default',
  forgotLink
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={name}>
          <span>{label}</span>
          {forgotLink && (
            <a href="/forgot-password">Forgot?</a>
          )}
        </label>
      )}
      <div className="input-wrapper">
        {Icon && <Icon className="input-icon" size={20} />}
        <input
          type={inputType}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-input ${variant} ${error ? 'error' : ''}`}
          autoComplete={isPassword ? 'current-password' : 'off'}
        />
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <span className="error-message">
          <AlertCircle size={14} />
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;