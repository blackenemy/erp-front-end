import { BUTTON_VARIANTS, BUTTON_SIZES } from './constants';

export const isValidButtonVariant = (
  variant: string
): variant is keyof typeof BUTTON_VARIANTS => {
  return Object.values(BUTTON_VARIANTS).includes(variant as any);
};

export const isValidButtonSize = (
  size: string
): size is keyof typeof BUTTON_SIZES => {
  return Object.values(BUTTON_SIZES).includes(size as any);
};

export const getButtonClassName = (
  variant: string,
  size: string,
  fullWidth: boolean,
  className?: string
): string => {
  const classes = ['button'];
  
  if (isValidButtonVariant(variant)) {
    classes.push(variant);
  }
  
  if (isValidButtonSize(size)) {
    classes.push(size);
  }
  
  if (fullWidth) {
    classes.push('fullWidth');
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.join(' ');
};
