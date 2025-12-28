// src/components/common/LoadingSpinner.jsx
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 40, color = '#667eea' }) => {
  return (
    <div 
      className="loading-spinner" 
      style={{ 
        width: size, 
        height: size,
        borderColor:  `${color}33`,
        borderTopColor: color
      }}
    />
  );
};

export default LoadingSpinner;