import React from 'react';

const Logo = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'logo-small',
    medium: 'logo-medium',
    large: 'logo-large'
  };

  return (
    <div className={`logo ${sizeClasses[size]} ${className}`}>
      <img src="/vite.svg" alt="Snack Roober Logo" />
    </div>
  );
};

export default Logo;
