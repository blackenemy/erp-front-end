import { FORM_LAYOUTS, FORM_LABEL_ALIGN } from './constants';

export const isValidFormLayout = (
  layout: string
): layout is keyof typeof FORM_LAYOUTS => {
  return Object.values(FORM_LAYOUTS).includes(layout as any);
};

export const isValidFormLabelAlign = (
  align: string
): align is keyof typeof FORM_LABEL_ALIGN => {
  return Object.values(FORM_LABEL_ALIGN).includes(align as any);
};

export const getFormItemClassName = (
  layout: string,
  className?: string
): string => {
  const classes = ['formItem'];
  
  if (layout === 'inline') {
    classes.push('inline');
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.join(' ');
};

export const validateRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateMinLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

export const validateMaxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

export const validatePattern = (value: string, pattern: RegExp): boolean => {
  return pattern.test(value);
};
