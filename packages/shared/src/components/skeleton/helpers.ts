import { SKELETON_VARIANTS } from './constants';

export const isValidSkeletonVariant = (
  variant: string
): variant is keyof typeof SKELETON_VARIANTS => {
  return Object.values(SKELETON_VARIANTS).includes(variant as any);
};

export const getDefaultHeight = (variant: string): string => {
  switch (variant) {
    case 'text':
      return '1rem';
    case 'circular':
      return '40px';
    default:
      return '20px';
  }
};

export const getSkeletonStyle = (
  width?: string | number,
  height?: string | number,
  variant?: string
): React.CSSProperties => {
  const style: React.CSSProperties = {};
  
  if (width) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  
  if (height) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  } else if (variant) {
    style.height = getDefaultHeight(variant);
  }
  
  return style;
};
