import React from 'react'

interface SpinnerIconProps {
  className?: string
  size?: number
  "aria-label"?: string
}

export const SpinnerIcon: React.FC<SpinnerIconProps> = ({
  className = '',
  size = 20,
  'aria-label': ariaLabel = 'Loading'
}) => (
  <svg
    role="status"
    aria-label={ariaLabel}
    className={`animate-spin text-current ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: size, height: size }}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      strokeOpacity="0.15"
    />
    <path
      d="M22 12a10 10 0 00-10-10"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
)
