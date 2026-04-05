export interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'outlined' | 'filled';
  fullWidth?: boolean;
}

export interface DatePickerVariants {
  default: 'default';
  outlined: 'outlined';
  filled: 'filled';
}
