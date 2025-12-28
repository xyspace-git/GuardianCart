import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'default',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  onClick,
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`submit-btn ${variant} ${size} ${fullWidth ? 'full-width' : ''} ${className} ripple`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <Loader2 size={20} className="btn-spinner" />
          <span>Please wait...</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={20} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;