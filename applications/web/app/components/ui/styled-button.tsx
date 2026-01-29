import React from 'react';

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'ghost';
  className?: string;
}

export const StyledButton: React.FC<StyledButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  className = '' 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`button${variant.charAt(0).toUpperCase() + variant.slice(1)} ${className}`}
    aria-disabled={disabled}
  >
    {children}
  </button>
);
