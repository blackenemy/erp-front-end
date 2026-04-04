import { BADGE_VARIANTS, BADGE_SIZES } from './constants';

export const isValidBadgeVariant = (
  variant: string
): variant is keyof typeof BADGE_VARIANTS => {
  return Object.values(BADGE_VARIANTS).includes(variant as any);
};

export const isValidBadgeSize = (
  size: string
): size is keyof typeof BADGE_SIZES => {
  return Object.values(BADGE_SIZES).includes(size as any);
};

export const formatCount = (count: number, maxCount: number): string => {
  if (count > maxCount) {
    return `${maxCount}+`;
  }
  return count.toString();
};

export const getBadgeClassName = (
  variant: string,
  size: string,
  dot: boolean,
  count?: number,
  className?: string
): string => {
  const classes = ['badge'];
  
  if (isValidBadgeVariant(variant)) {
    classes.push(variant);
  }
  
  if (isValidBadgeSize(size)) {
    classes.push(size);
  }
  
  if (dot) {
    classes.push('dot');
  }
  
  if (count !== undefined) {
    classes.push('count');
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.join(' ');
};
