export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  count?: number;
  maxCount?: number;
  className?: string;
}

export interface BadgeVariants {
  default: 'default';
  primary: 'primary';
  success: 'success';
  warning: 'warning';
  danger: 'danger';
  info: 'info';
}

export interface BadgeSizes {
  sm: 'sm';
  md: 'md';
  lg: 'lg';
}
