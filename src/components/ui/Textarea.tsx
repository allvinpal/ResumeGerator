import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
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
        <textarea
          ref={ref}
          id={inputId}
          className={`
            w-full rounded-lg border bg-white px-3 py-2 text-sm
            transition-colors duration-150 resize-y min-h-[80px]
            placeholder:text-secondary-400
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
        {error && <p className="text-xs text-danger-500">{error}</p>}
        {hint && !error && <p className="text-xs text-secondary-400">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
