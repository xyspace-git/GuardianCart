import React from 'react';
import { User, Store, Check } from 'lucide-react';

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  const roles = [
    { id: 'customer', label: 'Customer', icon: User, description: 'Buy tokens & order food' },
    { id: 'seller', label: 'Seller', icon: Store, description: 'Manage orders & sales' }
  ];

  return (
    <div className="role-selector">
      {roles.map(role => {
        const Icon = role.icon;
        const isActive = selectedRole === role.id;
        
        return (
          <button
            key={role.id}
            type="button"
            className={`role-btn ${isActive ? `active ${role.id}` : ''}`}
            onClick={() => onRoleChange(role.id)}
          >
            <div className="role-badge">
              <Check size={12} color="white" />
            </div>
            <div className="role-icon">
              <Icon 
                size={24} 
                color={isActive 
                  ? (role.id === 'customer' ? '#10b981' : '#f59e0b')
                  : '#6b7280'
                } 
              />
            </div>
            <span>{role.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;