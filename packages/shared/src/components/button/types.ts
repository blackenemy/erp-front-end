export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface ButtonVariants {
  primary: 'primary';
  secondary: 'secondary';
  tertiary: 'tertiary';
  danger: 'danger';
}

export interface ButtonSizes {
  sm: 'sm';
  md: 'md';
  lg: 'lg';
}
