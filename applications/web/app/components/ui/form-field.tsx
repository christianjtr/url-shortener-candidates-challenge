import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, id, children, className = '' }) => (
  <div className={className}>
    <label 
      htmlFor={id} 
      className="block mb-2 font-medium text-gray-700"
    >
      {label}
    </label>
    {children}
    {error && (
      <div 
        id={`${id}-error`} 
        role="alert" 
        aria-live="polite" 
        className="error"
      >
        {error}
      </div>
    )}
  </div>
);
