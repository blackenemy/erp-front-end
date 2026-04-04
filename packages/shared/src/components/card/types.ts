export interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface CardVariants {
  default: 'default';
  outlined: 'outlined';
  elevated: 'elevated';
  flat: 'flat';
}

export interface CardSizes {
  sm: 'sm';
  md: 'md';
  lg: 'lg';
}
