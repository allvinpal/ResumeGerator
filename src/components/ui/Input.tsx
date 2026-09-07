import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-secondary-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full rounded-lg border bg-white px-3 py-2 text-sm
              transition-colors duration-150
              placeholder:text-secondary-400
              ${icon ? 'pl-10' : ''}
              ${error
                ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20'
                : 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500/20'
              }
              focus:outline-none focus:ring-2
              disabled:bg-secondary-50 disabled:text-secondary-500
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-danger-500">{error}</p>}
        {hint && !error && <p className="text-xs text-secondary-400">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
