export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

export interface SkeletonVariants {
  text: 'text';
  circular: 'circular';
  rectangular: 'rectangular';
  rounded: 'rounded';
}
