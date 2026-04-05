import React from 'react';
import styles from './Form.module.css';

export interface FormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  layout?: 'vertical' | 'horizontal' | 'inline';
  labelAlign?: 'left' | 'right';
  labelCol?: number;
  wrapperCol?: number;
}

export interface FormItemProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
  error?: string;
  help?: string;
  className?: string;
}

export const FormContext = React.createContext<{
  layout?: 'vertical' | 'horizontal' | 'inline';
  labelAlign?: 'left' | 'right';
  labelCol?: number;
  wrapperCol?: number;
}>({});

export function Form({
  children,
  onSubmit,
  className,
  layout = 'vertical',
  labelAlign = 'left',
  labelCol = 6,
  wrapperCol = 18,
}: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <FormContext.Provider value={{ layout, labelAlign, labelCol, wrapperCol }}>
      <form onSubmit={handleSubmit} className={`${styles.form} ${styles[layout]} ${className || ''}`}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export function FormItem({
  children,
  label,
  required = false,
  error,
  help,
  className,
}: FormItemProps) {
  const context = React.useContext(FormContext);

  if (context.layout === 'inline') {
    return (
      <div className={`${styles.formItem} ${styles.inline} ${className || ''}`}>
        {label && (
          <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        {children}
        {error && <div className={styles.error}>{error}</div>}
        {!error && help && <div className={styles.help}>{help}</div>}
      </div>
    );
  }

  return (
    <div className={`${styles.formItem} ${className || ''}`}>
      {label && (
        <div className={styles.labelWrapper} style={{ flex: context.labelCol }}>
          <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        </div>
      )}
      <div className={styles.wrapper} style={{ flex: context.wrapperCol }}>
        {children}
        {error && <div className={styles.error}>{error}</div>}
        {!error && help && <div className={styles.help}>{help}</div>}
      </div>
    </div>
  );
}
