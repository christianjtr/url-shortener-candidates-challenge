import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { cn } from '../../lib/utils'

interface FormFieldProps {
  label: string
  error?: string
  id: string
  children: React.ReactNode
  className?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  id,
  children,
  className = ''
}) => (
  <div className={cn('space-y-2', className)}>
    <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
      {label}
    </label>
    {children}
    {error && (
      <div
        id={`${id}-error`}
        role="alert"
        aria-live="polite"
        className="flex items-start gap-3 text-sm text-red-800 bg-red-50 p-3 rounded-lg border border-red-100"
      >
        <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600 flex-none" />
        <div className="leading-tight font-medium">{error}</div>
      </div>
    )}
  </div>
)