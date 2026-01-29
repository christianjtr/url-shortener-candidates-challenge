import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SpinnerIconProps {
  className?: string;
}

export const SpinnerIcon: React.FC<SpinnerIconProps> = ({ className = '' }) => (
  <svg
    className={`spinner ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 11C21.5 11 22 11.5 22 12C22 12.5 21.5 13 21 13C20.5 13 20 12.5 20 12C20 11.5 20.5 11 21 11ZM12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18ZM12 20C9.79 20 8 18.21 8 16C8 13.79 9.79 12 12 12C14.21 12 16 13.79 16 16C16 18.21 14.21 20 12 20ZM3 13C3.5 13 4 12.5 4 12C4 11.5 3.5 11 3 11C2.5 11 2 11.5 2 12C2 12.5 2.5 13 3 13ZM12 10C8.69 10 6 7.31 6 4C6 2.34 7.34 1 9 1C10.66 1 12 2.34 12 4C12 7.31 9.31 10 6 10ZM19 13C19.5 13 20 12.5 20 12C20 11.5 19.5 11 19 11C18.5 11 18 11.5 18 12C18 12.5 18.5 13 19 13Z"
      fill="currentColor"
    />
  </svg>
);
