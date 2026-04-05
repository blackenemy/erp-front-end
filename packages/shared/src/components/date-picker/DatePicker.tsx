import React from 'react';
import styles from './DatePicker.module.css';
import type { DatePickerProps } from './types';

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({
    label,
    error,
    helperText,
    variant = 'default',
    fullWidth = false,
    className,
    id,
    ...props
  }, ref) => {
    const inputId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={`${styles.inputWrapper} ${styles[variant]} ${error ? styles.error : ''}`}>
          <span className={styles.leftIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </span>
          <input
            ref={ref}
            id={inputId}
            type="date"
            className={`${styles.input} ${className || ''}`}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <span className={`${styles.message} ${error ? styles.error : ''}`}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
