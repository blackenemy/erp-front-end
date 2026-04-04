import { CARD_VARIANTS, CARD_SIZES } from './constants';

export const isValidCardVariant = (
  variant: string
): variant is keyof typeof CARD_VARIANTS => {
  return Object.values(CARD_VARIANTS).includes(variant as any);
};

export const isValidCardSize = (
  size: string
): size is keyof typeof CARD_SIZES => {
  return Object.values(CARD_SIZES).includes(size as any);
};

export const getCardClassName = (
  variant: string,
  size: string,
  fullWidth: boolean,
  onClick?: () => void,
  className?: string
): string => {
  const classes = ['card'];
  
  if (isValidCardVariant(variant)) {
    classes.push(variant);
  }
  
  if (isValidCardSize(size)) {
    classes.push(size);
  }
  
  if (fullWidth) {
    classes.push('fullWidth');
  }
  
  if (onClick) {
    classes.push('clickable');
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.join(' ');
};
